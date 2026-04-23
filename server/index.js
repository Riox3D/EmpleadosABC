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
  try {
    const { claveUsuario, idTipoMovimiento, claveEmpleado } = req.body
    const pool = await poolPromise
    const fechaActual = new Date()

    const resultMaestro = await pool
      .request()
      .input('fechaRegistro', sql.Date, fechaActual)
      .input('claveUsuario', sql.VarChar, claveUsuario)
      .input('estatusSolicitud', sql.VarChar, 'En Proceso').query(`
        INSERT INTO Solicitudes (fechaRegistro, claveUsuario, estatusSolicitud)
        OUTPUT inserted.idSolicitud
        VALUES (@fechaRegistro, @claveUsuario, @estatusSolicitud)
      `)

    const nuevoIdSolicitud = resultMaestro.recordset[0].idSolicitud

    await pool
      .request()
      .input('idSolicitud', sql.Int, nuevoIdSolicitud)
      .input('idTipoMovimiento', sql.Int, idTipoMovimiento)
      .input('claveEmpleado', sql.VarChar, claveEmpleado).query(`
        INSERT INTO detalle_Solicitud (idSolicitud, idTipoMovimiento, claveEmpleado)
        VALUES (@idSolicitud, @idTipoMovimiento, @claveEmpleado)
      `)

    res.json({
      success: true,
      message: 'Solicitud registrada correctamente',
      idGenerado: nuevoIdSolicitud,
    })
  } catch (err) {
    console.error('Error al insertar en BD:', err)
    res.status(500).json({ error: 'Error al guardar la solicitud: ' + err.message })
  }
})

const PORT = process.env.API_PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
