import ViewInstructions from 'models/ViewInstructions'
import { dbConnection } from 'utils/db'

dbConnection()

export default async function handler(req, res) {
  const { method, body } = req
  if (method === 'POST') {
    try {
      const viewInstructions = body
      const data = await ViewInstructions.find({
        nombre: viewInstructions.nombre
      })
      console.log(data)
      if (data.length > 0) {
        console.log('entro')
        return res.status(203).json({ error: 'Instruccion ya existe' })
      }
      console.log('sale')
      const newViewInstructions = await new ViewInstructions(viewInstructions)
      newViewInstructions.save()
      res.status(201).json(newViewInstructions)
    } catch (error) {
      res.status(203).json({ error: 'Error al crear la instruccion' })
    }
  } else if (method === 'GET') {
    try {
      const viewInstructions = await ViewInstructions.find()
      res.status(200).json(viewInstructions)
    } catch (error) {
      res.status(206).json({ error: 'Error al obtener las instrucciones' })
    }
  }
}
