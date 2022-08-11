import axios from 'axios'

export async function upload(file) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await axios.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  if (res.status === 200) {
    return res.data
  } else {
    return 'error'
  }
}
