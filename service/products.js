import axios from 'axios'

const baseUrl = 'http://localhost:3000/api'

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
