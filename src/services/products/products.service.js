const { ProductNotFoundException } = require('../../exceptions')

class ProductService {
  constructor() {
    // Simula una base de datos en memoria
    this.state = {
      products: [],
      rowCount: 0,
    }
  }

  getAll() {
    return this.state.products
  }

  getById(id) {
    const product = this.state.products.find((item) => item.id == id)
    if (!product) throw new ProductNotFoundException()
    return product
  }

  create(data) {
    // Seteamos el nuevo id y guardamos en la base de datos
    this.state.rowCount += 1
    const newProduct = { id: this.state.rowCount, ...data }
    this.state.products.push(newProduct)
    return newProduct
  }

  putById(id, changes) {
    // Modifico el producto en cuestion dentro de la base de datos
    this.state.products = this.state.products.map((product) => {
      if (product.id === parseInt(id)) {
        product = { ...product, ...changes }
      }
      return product
    })
  }

  deleteById(id) {
    this.state.products = this.state.products.filter(
      (product) => product.id !== parseInt(id)
    )
  }
}

module.exports = ProductService
