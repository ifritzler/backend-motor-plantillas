const express = require('express')
const router = require('../routes')
const errorResponseMiddleware = require('../middlewares/errorResponseHandler')
require('dotenv').config()

const app = express()

// Middlewares
app.use(express.json())
app.use(express.static('public', {}))

// Routers
app.use('/api', router)
// Manejador de errores en la aplicacacion
app.use(errorResponseMiddleware)

// Main Route
app.get('/', (_req, res) => {
  res.sendFile('index.html')
})

// Export module
module.exports = app
