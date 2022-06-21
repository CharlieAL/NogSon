import Part from 'models/Part'
import { dbConnection } from 'utils/db'

dbConnection()

export default async function handler(req, res) {
  const { method } = req
  if (method === 'GET') {
    // ver si es scrap, material o pieza. cada campo debe llevar
    const parts = await Part.find().sort({ updatedAt: -1 })
    res.status(200).json(parts)
  } else if (method === 'POST') {
    // si se crea una pieza de 2x2 y se utiliza un material de 10x10 se debe pasar a scrap y su valor 8x8,
    const { body } = req
    const { nombre, precio, descripcion, cantidad, materiales } = body
    // restar cantidad de materiales
    const pieza = {
      nombre,
      precio,
      descripcion,
      cantidad,
      materiales
    }
    try {
      const newPieza = await new Part(pieza)
      newPieza.save()
      res.status(201).json(newPieza)
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Error al crear la pieza' })
    }
  }
}
