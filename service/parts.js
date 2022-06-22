export default function getPiezasFormProducts(data) {
  const url = '/api/piezas/compose'
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((response) => {
      return response
    })
    .catch((err) => console.log(err))
}
