import { dbConnection } from 'utils/db'

import Part from 'models/Part'

dbConnection()

export default async function handler(req, res) {
  const { method } = req
  const { query } = req
  const { id } = query
  if (method === 'GET') {
    try {
      const product = await Part.findById(id)
      res.status(200).json(product)
    } catch (error) {
      res.status(404).end()
    }
  }
}
