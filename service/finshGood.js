import axios from 'axios'

export async function createFinishGood(body) {
  const res = await axios.post('http://localhost:3000/api/finishGood', body)
  console.log(res)
  if (res.status === 201) {
    return res.data
  } else if (res.status === 400) {
    console.log('errror')
  }
}

export function getFinishGood() {
  return fetch('http://localhost:3000/api/finishGood')
    .then((res) => res.json())
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log('err', err)
    })
}

export async function updateFinishGood(body) {
  try {
    const response = await axios.put(
      'http://localhost:3000/api/finishGood',
      body
    )
    return response.data
  } catch (err) {
    console.log(err)
  }
}