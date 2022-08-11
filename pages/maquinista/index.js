import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'
import { getInstructions } from 'service/instructions'

export default function Maquinista() {
  useUser()
  const [data, setData] = useState([])
  useEffect(() => {
    getInstructions().then((data) => {
      setData(data)
    })
  }, [])
  return (
    <>
      <div className='pt-7'>
        <h1 className='text-center text-3xl'>Trabajos</h1>
      </div>
      <main className='pt-10'>
        {data.map((item) => (
          <div key={item.id}>
            <h1 className='text-center'>{item.nombre}</h1>
            <div className=''>
              <img className='' src={item.imageURL} alt={item.nombre} />
            </div>
          </div>
        ))}
      </main>
    </>
  )
}
