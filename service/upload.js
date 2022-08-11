import axios from 'axios'
import { URLNogSon } from 'utils/URL'
export async function upload(file) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await axios.post(`${URLNogSon()}/api/upload`, formData, {
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
