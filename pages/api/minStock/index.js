import MinStock from 'models/MinStocks'
import { dbConnection } from 'utils/db'

dbConnection()

export default async function handler(req, res) {
  const { method, body } = req
  if (method === 'GET') {
    // ver si es scrap, material o pieza. cada campo debe llevar
    try {
      const minStocks = await MinStock.find({})
      return res.status(200).json(minStocks)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  } else if (method === 'POST') {
    try {
      const minStock = await MinStock.create(body)
      return res.status(201).json(minStock)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
