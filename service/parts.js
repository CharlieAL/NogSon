export function getPiezasFormProducts(data) {
  const fetchUrl = `${process.env.NOG_URL}/api/piezas/compose`

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

export async function getPiezas() {
  const res = await fetch(`/api/piezas`)
  const piezas = await res.json()
  return piezas
}
