import axios from 'axios'
export function getPiezasFormProducts(data) {
  const fetchUrl = `https://nogson.vercel.app/api/piezas/compose`

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
