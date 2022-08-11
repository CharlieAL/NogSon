import { dbConnection } from 'utils/db'

import Proveedor from 'models/Proveedor'

dbConnection()

export default async function handler(req, res) {
  const { method, body } = req
  if (method === 'GET') {
    try {
      const data = await Proveedor.find()
      res.status(200).json(data)
    } catch (error) {
      res.status(404).end()
    }
  } else if (method === 'POST') {
    try {
      const data = await Proveedor.create(body)
      res.status(201).json(data)
    } catch (error) {
      res.status(400).end()
    }
  }
}
