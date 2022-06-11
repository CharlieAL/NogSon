import Part from 'models/Part'
import Product from 'models/Product'
import { dbConnection } from 'utils/db'

dbConnection()

export default async function handler(req, res) {
  const { method, body } = req
  if (method === 'GET') {
    // ver si es scrap, material o pieza. cada campo debe llevar
    const products = await Product.find().sort({ updatedAt: -1 })
    res.status(200).json(products)
  } else if (method === 'POST') {
    const { nombre, precio, descripcion, cliente, cantidad, piezas } = body

    for (let i = 0; i < piezas.length; i++) {
      const resultado = await Part.find({ nombre: piezas[i].nombre })
      const cantidadTotal = piezas[i].cantidad * cantidad
      const cantidadOld = resultado[0].cantidad
      const cantidadNew = cantidadOld - cantidadTotal
      if (cantidadNew < 0) {
        return res
          .status(400)
          .json({ error: 'No hay suficiente cantidad de piezas' })
      } else {
        const newPart = await Part.findOneAndUpdate(
          { nombre: piezas[i].nombre },
          { cantidad: cantidadNew }
        )
        res.status(201).json(newPart)
      }
    }

    const product = {
      nombre,
      precio,
      descripcion,
      cliente,
      cantidad,
      status: 'stop',
      piezas
    }
    try {
      const newProduct = new Product(product)
      await newProduct.save()
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
