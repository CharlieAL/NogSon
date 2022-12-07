import { dbConnection } from 'utils/db'

import Part from 'models/Part'

dbConnection()

export default async function handler(req, res) {
  const { method } = req
  const { body } = req

  if (method === 'POST') {
    try {
      const array = []

      const data = body
      for (const part of data) {
        const partComplete = await Part.find({ nombre: part.nombre })
        const cantidadTotal = partComplete[0].cantidad
        part.cantidadTotal = cantidadTotal
        part.descripcion = partComplete[0].descripcion
        part.id = partComplete[0].id
        part.alto = partComplete[0].alto
        part.ancho = partComplete[0].ancho
        part.imageURL = partComplete[0].imageURL
        part.minStock = partComplete[0].minStock
        part.precio = partComplete[0].precio
        part.proveedor = partComplete[0].proveedor
        array.push(part)
      }
      return res.status(200).json(array)
    } catch (error) {
      res.status(404).end()
    }
  }
}
