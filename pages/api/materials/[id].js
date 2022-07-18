import Material from 'models/Material'

export default async function handler(req, res) {
  const { method, body } = req
  const { query } = req
  const { id } = query
  if (method === 'GET') {
    try {
      const product = await Material.findById(id)
      res.status(200).json(product)
    } catch (error) {
      res.status(404).end()
    }
  } else if (method === 'PUT') {
    try {
      const product = await Material.findByIdAndUpdate(id, body)
      res.status(200).json(product)
    } catch (error) {
      res.status(404).end()
    }
  }
}
