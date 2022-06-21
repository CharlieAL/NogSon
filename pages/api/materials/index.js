import { dbConnection } from 'utils/db'
import Material from 'models/Material'
import Part from 'models/Part'
dbConnection()

export default async function handler(req, res) {
  const { method } = req
  if (method === 'GET') {
    // ver si es scrap, material o pieza. cada campo debe llevar
    const materials = await Material.find({})
    res.status(200).json(materials)
  } else if (method === 'POST') {
    const { body } = req
    const { nombre, precio, descripcion, cantidad, scrap, pieza } = body
    if (pieza) {
      try {
        const part = new Part({
          nombre,
          precio,
          descripcion,
          cantidad
        })
        await part.save()
        return res.status(201).json(part)
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
    }
    const material = {
      nombre,
      precio,
      descripcion,
      cantidad,
      scrap
    }
    try {
      const find = await Material.find({ nombre: material.nombre })
      if (find.length > 0) {
        return res.status(400).json({
          message: 'Material already exists'
        })
      }
      const newMaterial = await new Material(material)
      newMaterial.save()
      res.status(201).json(newMaterial)
    } catch (error) {
      res.status(400).json({ error: 'Error al crear la pieza' })
    }
  }
}
