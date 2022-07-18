import axios from 'axios'
export function getPiezasFormProducts(data) {
  const fetchUrl = `http://localhost:3000/api/piezas/compose`

  return fetch(fetchUrl, {
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((response) => {
      return response
    })
    .catch((err) => console.log(err))
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
