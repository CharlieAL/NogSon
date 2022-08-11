import axios from 'axios'
export async function sendInstructions(params) {
  const res = await axios.post('/api/instructions', params)
  if (res.status === 201) {
    return {
      msg: 'datos enviados',
      boolean: true
    }
  } else {
    console.log()
    return {
      msg: res.data.error || 'Ocurrio un error al enviar las instrucciones',
      boolean: false
    }
  }
}

export async function getInstructions() {
  const res = await axios.get('/api/instructions')
  if (res.status === 200) {
    return res.data
  } else {
    return 'Error al obtener las instrucciones'
  }
}
