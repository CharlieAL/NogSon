import Product from 'models/Product'
import { dbConnection } from 'utils/db'

dbConnection()

export default async function handler(req, res) {
  const { method, body } = req
  if (method === 'GET') {
    // ver si es scrap, material o pieza. cada campo debe llevar
    const products = await Product.find({})
      .sort({ updatedAt: -1 })
      .populate('piezas')
    res.status(200).json(products)
  } else if (method === 'POST') {
    const { nombre, precio, descripcion, piezas, imageURL } = body
    const product = {
      nombre,
      precio,
      descripcion,
      cantidad: 1,
      piezas,
      imageURL
    }
    try {
      const newProduct = new Product(product)
      await newProduct.save()
      return res.status(201).json(newProduct)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  } else if (method === 'PUT') {
    const { id } = body
    try {
      const product = await Product.findByIdAndUpdate(id, body, { new: true })
      return res.status(200).json(product)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
