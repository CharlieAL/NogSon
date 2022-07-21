import axios from 'axios'

export default function uploadImage(file) {
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/nogson/image/upload'
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'todtl8pl')
  return axios
    .post(CLOUDINARY_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      return res.data.secure_url
    })
}
