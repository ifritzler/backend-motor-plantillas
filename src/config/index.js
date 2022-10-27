const express = require('express')
const router = require('../routes')
const errorResponseMiddleware = require('../middlewares/errorResponseHandler')
const productService = require('../services/products/products.service')
// const configHandlebars = require('./handlebars')
// const configPug = require('./pug')
const configEjs = require('./ejs')
require('dotenv').config()

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handlebars config
// configHandlebars(app)

// Pug Configuration
// configPug(app)

// EJS Configuration
configEjs(app)

// Routers
app.use('/api', router)

// Main Route
app.get('/', (_req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello world' })
})

app.get('/products', (_req, res) => {
  const products = productService.getAll()
  res.render('products', {
    products,
    hasContent: products.length > 0,
  })
})

// Manejador de errores en la aplicacacion
app.use(errorResponseMiddleware)

// Export module
module.exports = app
