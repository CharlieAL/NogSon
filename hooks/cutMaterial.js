export function getAreaDiff(alturaM, largoM, alturaP, largoP, cantidad = 0) {
  if (cantidad < 1) return { error: 'cantidad es 0' }
  const x = Math.floor(largoM / largoP)
  const y = Math.floor(alturaM / alturaP)
  const cantidadMaxDePiezas = x * y
  if (cantidad > cantidadMaxDePiezas) {
    return { error: `cantidad maxima es de ${cantidadMaxDePiezas}` }
  }
  const areaM = alturaM * largoM
  const areaP = alturaP * largoP * cantidad
  const area = areaM - areaP
  return { area, cantidadMaxDePiezas }
}
