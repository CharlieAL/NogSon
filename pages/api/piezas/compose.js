import { dbConnection } from 'utils/db'

import Part from 'models/Part'

dbConnection()

export default async function handler(req, res) {
  const { method } = req
  const { body } = req

  if (method === 'POST') {
    try {
      const array = []

      const data = JSON.parse(body)
      for (const part of data) {
        const partComplete = await Part.find({ descripcion: part.nombre })
        const cantidadTotal = partComplete[0].cantidad
        part.cantidadTotal = cantidadTotal
        part.descripcion = partComplete[0].nombre
        part.id = partComplete[0].id
        array.push(part)
      }
      return res.status(200).json(array)
    } catch (error) {
      res.status(404).end()
    }
  }
}
