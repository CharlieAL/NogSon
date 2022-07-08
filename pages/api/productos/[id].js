import { dbConnection } from 'utils/db'

import Product from 'models/Product'

dbConnection()

export default async function handler(req, res) {
  const { method } = req
  const { query } = req
  const { id } = query
  if (method === 'GET') {
    try {
      const product = await Product.findById(id)
      // const data = JSON.stringify(product)
      // const dataJson = JSON.parse(data)
      res.status(200).json(product)
    } catch (error) {
      res.status(404).end()
    }
  } else if (method === 'DELETE') {
    try {
      await Product.findByIdAndDelete(id)
      res.status(204).end()
    } catch (error) {
      res.status(400).end()
    }
  }
}
