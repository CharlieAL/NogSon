import Material from 'models/Material'
import Part from 'models/Part'
import Scrap from 'models/Scrap'
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
    const { nombre, precio, descripcion, cantidad, materiales, minStock } =
      body.part
    const { same, id } = body.scrap
    console.log(body.scrap)
    if (same) {
      try {
        await Scrap.findByIdAndUpdate(id, body.scrap)
      } catch (error) {
        console.log(error)
      }
      console.log('scrap updated')
    } else {
      console.log('entro')
      // restar cantidad de materiales
      const material = await Material.findOne({ nombre: materiales.nombre })
      const cantidadQuedante = material.cantidad - 1
      await Material.findOneAndUpdate(
        { nombre: materiales.nombre },
        { cantidad: cantidadQuedante }
      )
      try {
        const newScrap = await new Scrap(body.scrap)
        newScrap.save()
      } catch (error) {
        return res.status(400).json({ error: 'Error al crear el scrap' })
      }
    }

    const pieza = {
      nombre,
      precio,
      descripcion,
      cantidad,
      materiales,
      minStock
    }
    try {
      const newPieza = await new Part(pieza)
      newPieza.save()
      res.status(201).json(newPieza)
    } catch (error) {
      res.status(400).json({ error: 'Error al crear la pieza' })
    }
  }
}
