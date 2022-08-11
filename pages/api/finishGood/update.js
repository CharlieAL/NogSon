import { dbConnection } from 'utils/db'
import FinishGood from 'models/FinishGood'

dbConnection()

export default async function handler(req, res) {
  const { method, body } = req
  if (method === 'PUT') {
    try {
      console.log(body)
      const data = await FinishGood.findByIdAndUpdate(body.id, body, {
        new: true
      })
      return res.status(201).json(data)
    } catch (error) {
      res.status(404).end()
    }
  }
}
