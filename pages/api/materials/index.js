import { dbConnection } from 'utils/db'
import Material from 'models/Material'
import Part from 'models/Part'
import Scrap from 'models/Scrap'
dbConnection()

export default async function handler(req, res) {
  const { method } = req
  if (method === 'GET') {
    // ver si es scrap, material o pieza. cada campo debe llevar
    const materials = await Material.find({})
    const materiales = []
    for (const material of materials) {
      const array = material.nombre.split('x')
      const objeto = {}
      const altura = array[0]
      const largo = array[1]
      objeto.altura = altura
      objeto.largo = largo
      objeto.nombre = material.nombre
      objeto.descripcion = material.descripcion
      objeto.cantidad = material.cantidad
      objeto.minStock = material.minStock
      objeto.id = material._id
      objeto.precio = material.precio
      materiales.push(objeto)
    }
    res.status(200).json(materiales)
  } else if (method === 'POST') {
    const { body } = req
    const {
      id,
      nombre,
      precio,
      descripcion,
      cantidad,
      scrap,
      pieza,
      finded,
      minStock
    } = body
    if (
      nombre === '' ||
      precio === '' ||
      descripcion === '' ||
      cantidad === ''
    ) {
      return res
        .status(400)
        .json({ error: 'Name, Price, Description y Quantity are required' })
    }
    if (finded) {
      try {
        const cantindadInt = parseInt(cantidad)
        console.log(body)
        const data = await Material.findByIdAndUpdate(
          id,
          { cantidad: cantindadInt },
          {
            new: true
          }
        )
        console.log(data)
        return res.status(201).json(data)
      } catch (error) {
        return res
          .status(400)
          .json({ error: 'Error al actualizar el material' })
      }
    } else if (pieza) {
      try {
        const part = new Part({
          nombre,
          precio,
          descripcion,
          cantidad,
          scrap
        })
        console.log(part, 'part')
        await part.save()
        return res.status(201).json(part)
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
    } else if (scrap) {
      const array = nombre.split('x')
      const altura = array[0]
      const largo = array[1]
      const area = altura * largo
      const newScrap = new Scrap({
        nombre,
        precio,
        descripcion,
        cantidad,
        area
      })
      console.log(newScrap, 'newScrap')
      await newScrap.save()
      return res.status(201).json(newScrap)
    }
    const material = {
      nombre,
      precio,
      descripcion,
      cantidad,
      minStock
    }
    try {
      const newMaterial = await new Material(material)
      newMaterial.save()
      res.status(201).json(newMaterial)
    } catch (error) {
      res.status(400).json({ error: 'Error al crear la pieza' })
    }
  } else if (method === 'PUT') {
    const { body } = req
    const { id, nombre, precio, descripcion, cantidad, scrap } = body
    const material = {
      nombre,
      precio,
      descripcion,
      cantidad,
      scrap
    }
    try {
      const data = await Material.findByIdAndUpdate(id, material, { new: true })
      res.send(data)
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Error al actualizar el material' })
    }
  }
}
