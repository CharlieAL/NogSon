import axios from 'axios'
export async function getPiezasFormProducts(data, URL) {
  const fetchUrl = `${URL}/api/piezas/compose`
  const res = await axios.post(fetchUrl, data)
  return res.data
}

export async function createPart(body) {
  const res = await axios.post(`/api/piezas`, body)
  return res.data
}

export async function getPiezas() {
  const res = await fetch(`/api/piezas`)
  const piezas = await res.json()
  return piezas
}

export async function getPieza(id) {
  const res = await axios.get(`/api/piezas/${id}`)
  return res.data
}

export async function updatePieza(id, body) {
  const res = await axios.put(`/api/piezas/${id}`, body)
  return res.data
}
