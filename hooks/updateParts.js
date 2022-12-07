import Part from 'models/Part'

import { dbConnection } from 'utils/db'
dbConnection()

export default async function updateAmountOfParts(cantidad, piezas) {
  console.log(cantidad, piezas)
  if (cantidad === '') return { error: 'Quantity is required' }
  const cantidadInt = parseInt(cantidad)
  for (let i = 0; i < piezas.length; i++) {
    const pieza = piezas[i]
    const total = cantidadInt * pieza.cantidad
    if (total > pieza.cantidadTotal) {
      return {
        error: `You need (${total - pieza.cantidadTotal} U) ${pieza.nombre}`
      }
    } else {
      const cantidadRestante = pieza.cantidadTotal - total
      try {
        await Part.findOneAndUpdate(
          { nombre: pieza.nombre },
          { cantidad: cantidadRestante }
        )
      } catch (error) {
        return { error: 'Error updating part' }
      }
    }
  }
  return { success: 'Parts updated', error: false }
}
