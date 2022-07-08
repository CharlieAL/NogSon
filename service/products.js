import axios from 'axios'

const baseUrl = '/api'

export const createProduct = async (body) => {
  const response = await axios.post(`${baseUrl}/productos`, body)
  if (response.status === 201) {
    return response.data
  }
}

export const getProducts = async () => {
  const response = await axios.get(`${baseUrl}/productos`)
  if (response.status === 200) {
    return response.data
  }
}

export const updateProduct = async (body) => {
  const response = await axios.put(`${baseUrl}/productos`, body)
  if (response.status === 200) {
    return response.data
  }
}

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${baseUrl}/productos/${id}`)
  if (response.status === 200) {
    return response.data
  }
}
