import axios from 'axios'

export async function createFinishGood(body) {
  const res = await axios.post('/api/finishGood', body)
  console.log(res)
  if (res.status === 201) {
    return res.data
  } else if (res.status === 400) {
    console.log('errror')
  }
}

export async function getFinishGood() {
  const response = await axios.get('/api/finishGood')
  return response.data
}

export async function updateFinishGood(body) {
  try {
    const response = await axios.put('api/finishGood', body)
    return response.data
  } catch (err) {
    console.log(err)
  }
}
