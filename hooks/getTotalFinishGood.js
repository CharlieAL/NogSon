export default function getTotalFinishGood(cantidad, precioVenta) {
  if (precioVenta === '' || cantidad === '') {
    return 0
  }
  return precioVenta * cantidad
}
