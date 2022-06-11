import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/'

export const login = async (name, password) => {
  const response = await axios.post(`${baseUrl}login`, { name, password })
  if (response.status === 200) {
    localStorage.setItem('nogsonUser', JSON.stringify(response.data.user))
    return response.data.user
  }
}
