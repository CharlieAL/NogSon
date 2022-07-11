import Scrap from 'models/Scrap'

export default async function handler(req, res) {
  const { method } = req
  if (method === 'GET') {
    const scrap = await Scrap.find()
    const scrapes = []
    for (const data of scrap) {
      const values = data.nombre.split('x')
      const objeto = {}

      const areaM = parseInt(values[0]) * parseInt(values[1])
      objeto.nombre = data.nombre
      objeto.area = data.area
      objeto.descripcion = data.descripcion
      objeto.createdAt = data.createdAt
      objeto.updatedAt = data.updatedAt
      objeto.id = data.id
      if (data.area < areaM * 0.25) {
        objeto.status = 'bajo'
      } else if (data.area <= areaM * 0.5) {
        objeto.status = 'medio'
      } else if (data.area <= areaM * 0.75) {
        objeto.status = 'bueno'
      } else if (data.area > areaM * 0.75) {
        objeto.status = 'excelente'
      }
      scrapes.push(objeto)
    }
    res.status(200).json(scrapes)
  } else if (method === 'POST') {
    const { body } = req
    const scrap = new Scrap(body)
    try {
      await scrap.save()
      res.status(200).json(scrap)
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}
