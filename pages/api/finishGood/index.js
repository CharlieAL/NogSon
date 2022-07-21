import { dbConnection } from 'utils/db'
import FinishGood from 'models/FinishGood'
import updateAmountOfParts from 'hooks/updateParts'
import getTotalFinishGood from 'hooks/getTotalFinishGood'

dbConnection()

export default async function handler(req, res) {
  const { method, body } = req
  if (method === 'POST') {
    const { cliente, comprador, precioVenta, cantidad, productoId, piezas } =
      body
    if (cliente === '') {
      return res.status(400).json({ error: 'Custumer is required' })
    }
    if (comprador === '') {
      return res.status(400).json({ error: 'Seller is required' })
    }
    if (precioVenta === '') {
      return res.status(400).json({ error: 'Price is required' })
    }
    const data = await updateAmountOfParts(cantidad, piezas)
    if (data.error) return res.status(400).json(data)
    const precioTotal = getTotalFinishGood(cantidad, precioVenta)
    const newFinishGood = {
      cliente,
      comprador,
      precioVenta,
      cantidad,
      precioTotal,
      productoId
    }

    try {
      const finishGood = await FinishGood.create(newFinishGood)
      return res.status(201).json(finishGood)
    } catch (error) {
      return res.status(400).end()
    }
  } else if (method === 'GET') {
    try {
      const finishGoods = await FinishGood.find().populate('productoId', {
        _id: 0,
        nombre: 1
      })
      let total = 0
      let precio
      for (const part of finishGoods) {
        // const cantidad = parseInt(part.cantidad)
        if (part.precioVenta !== '') {
          precio = parseInt(part.precioTotal)
          total = total + precio
        }
      }
      return res.status(201).json({ finishGoods, total })
    } catch (error) {
      res.status(404).end()
    }
  } else if (method === 'PUT') {
    try {
      console.log(body)
      const data = await FinishGood.findByIdAndUpdate(body.id, {
        status: 'finished'
      })
      return res.status(201).json(data)
    } catch (error) {
      res.status(404).end()
    }
  }
}
