import axios from 'axios'
export async function getMaterials() {
  const res = await fetch(`/api/materials`)
  const materials = await res.json()
  return materials
}

export async function createMaterial(body) {
  const res = await axios.post(`/api/materials`, body)
  if (res.status === 201) {
    return res.data
  } else if (res.status === 400) {
    const { error } = res.data
    return error
  }
}

export async function getMaterial(id) {
  const res = await axios.get(`/api/materials/${id}`)
  return res.data
}

export async function updateMaterial(id, body) {
  const res = await axios.put(`/api/materials/${id}`, body)
  return res.data
}
