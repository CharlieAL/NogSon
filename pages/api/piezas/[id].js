import { dbConnection } from 'utils/db'

import Part from 'models/Part'
// import Material from 'models/Material'
import Scrap from 'models/Scrap'

dbConnection()

export default async function handler(req, res) {
  const { method, body } = req
  const { query } = req
  const { id } = query
  if (method === 'GET') {
    try {
      const product = await Part.findById(id)
      res.status(200).json(product)
    } catch (error) {
      res.status(404).end()
    }
  } else if (method === 'PUT') {
    try {
      const { cantidad, cantidadTotal, nombre, descripcion, precio, minStock } =
        body
      const cantidadInt = parseInt(cantidad)
      const cantidadActual = cantidadTotal + cantidadInt
      const { area, descripcion: descripcionM } = body.material
      const scrap = await Scrap.find({ descripcion: descripcionM })
      // const material = await Material.find({ descripcion: descripcionM })
      if (cantidadInt > 0) {
        if (scrap.length > 0) {
          const areaP = cantidadInt * area
          const areaRestante = scrap[0].area - areaP
          await Scrap.findByIdAndUpdate(scrap[0]._id, { area: areaRestante })
        }
      }
      console.log(body)
      const part = {
        nombre,
        descripcion,
        precio,
        cantidad: cantidadActual,
        minStock
      }
      const product = await Part.findByIdAndUpdate(id, part)
      res.status(200).json(product)
    } catch (error) {
      res.status(404).end()
    }
  }
}
