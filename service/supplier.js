import axios from 'axios'

export async function getSupplier() {
  const res = await axios.get(`/api/proveedor`)
  return res.data
}

export async function createSupplier(body) {
  const res = await axios.post(`/api/proveedor`, body)
  return res.data
}
