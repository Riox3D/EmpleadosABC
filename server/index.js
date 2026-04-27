require('dotenv').config()
const express = require('express')
const sql = require('mssql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
}

let poolPromise = sql
  .connect(dbConfig)
  .then((pool) => {
    console.log('Conexión a BD exitosa')
    return pool
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err)
    process.exit(1)
  })

app.get('/api/roles', async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query('SELECT * FROM Roles')
    res.json(result.recordset)
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar roles: ' + err.message })
  }
})

app.get('/api/movimientos', async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().query(`
      SELECT idTipoMovimiento, descripcion 
      FROM c_movimientos 
      WHERE estatus = '1'
    `)
    res.json(result.recordset)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


app.post('/api/solicitudes', async (req, res) => {
  const pool = await poolPromise
  const transaction = new sql.Transaction(pool)

  try {
    const { claveUsuario, idTipoMovimiento, claveEmpleado, observaciones } = req.body
    await transaction.begin()
    const request = new sql.Request(transaction)

   
    const resultMaestro = await request
      .input('fechaRegistro', sql.Date, new Date())
      .input('claveUsuario', sql.VarChar, claveUsuario)
      .input('estatusSolicitud', sql.VarChar, 'Pendiente_Validacion_TI').query(`
        INSERT INTO Solicitudes (fechaRegistro, claveUsuario, estatusSolicitud)
        OUTPUT inserted.idSolicitud
        VALUES (@fechaRegistro, @claveUsuario, @estatusSolicitud)
      `)

    const nuevoIdSolicitud = resultMaestro.recordset[0].idSolicitud

    
    const resultDetalle = await request
      .input('idSolicitud', sql.Int, nuevoIdSolicitud)
      .input('idTipoMovimiento', sql.Int, idTipoMovimiento)
      .input('claveEmpleado', sql.VarChar, claveEmpleado || null)
      .input('observaciones', sql.VarChar, observaciones || '').query(`
        INSERT INTO detalle_Solicitud (idSolicitud, idTipoMovimiento, claveEmpleado, observaciones)
        OUTPUT inserted.idDetalle
        VALUES (@idSolicitud, @idTipoMovimiento, @claveEmpleado, @observaciones)
      `)

    const nuevoIdDetalle = resultDetalle.recordset[0].idDetalle

    
    await request
      .input('idS', sql.Int, nuevoIdSolicitud)
      .input('idD', sql.Int, nuevoIdDetalle)
      .input('idTM', sql.Int, idTipoMovimiento).query(`
        INSERT INTO detalle_Solicitud_Actividades (
          idSolicitud, idDetalle, idActividades, estatusActividad
        )
        SELECT @idS, @idD, idActividad, 0
        FROM c_actividades_mov
        WHERE idTipoMovimiento = @idTM
      `)

    await transaction.commit()
    res.json({ success: true, idGenerado: nuevoIdSolicitud })
  } catch (err) {
    if (transaction) await transaction.rollback()
    console.error('Error al guardar todo:', err)
    res.status(500).json({ error: 'Error interno: ' + err.message })
  }
})

app.get('/api/solicitudes/:id', async (req, res) => {
  try {
    const pool = await poolPromise
    const result = await pool.request().input('id', sql.Int, req.params.id).query(`
        SELECT s.idSolicitud, s.fechaRegistro, s.estatusSolicitud, 
               d.claveEmpleado, d.observaciones as obsRegistro,
               m.descripcion as tipoMovimiento
        FROM Solicitudes s
        JOIN detalle_Solicitud d ON s.idSolicitud = d.idSolicitud
        JOIN c_movimientos m ON d.idTipoMovimiento = m.idTipoMovimiento
        WHERE s.idSolicitud = @id;

      
        SELECT dsa.idSolicitudActividad, dsa.estatusActividad as completado, 
               ca.descripcion as titulo, ca.esAutomatica
        FROM detalle_Solicitud_Actividades dsa
        JOIN c_actividades ca ON dsa.idActividades = ca.idActividad
        WHERE dsa.idSolicitud = @id;
      `)

    if (result.recordsets[0].length === 0) {
      return res.status(404).json({ error: 'Solicitud no encontrada' })
    }

    res.json({
      ...result.recordsets[0][0],
      pasos: result.recordsets[1],
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.API_PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
