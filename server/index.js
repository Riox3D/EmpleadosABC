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
    console.log('Conexión exitosa')
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

const PORT = process.env.API_PORT || 3000
app.listen(PORT, () => {
  console.log(`Conexiòn exitosa `)
})
