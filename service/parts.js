export default function getPiezasFormProducts(data) {
  const url = 'http://localhost:3000/api/piezas/compose'
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
