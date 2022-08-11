// import { useState } from 'react'
import { getPiezasFormProducts } from 'service/parts'
import { URLNogSon } from 'utils/URL'
// import { sendInstructions } from 'service/instructions'

export default function StatusProduc(props) {
  const { producto } = props
  // const [statusButton, setStatusButton] = useState(false)
  // const [message, setMessage] = useState(false)
  console.log(producto)
  if (producto === null) {
    return <p>Loading.....</p>
  }
  // const handlePrint = (e) => {
  //   e.preventDefault()
  //   window.print()
  // }

  return (
    <>
      <section>
        <div className='text-center'>
          <iframe
            className='w-full h-screen'
            src={`/${producto.nombre}.pdf`}
            type='application/pdf'
          />
        </div>
      </section>
      <style jsx>{`
        section {
          flex: 1;
          overflow-y: auto;
        }
        #customers {
          font-family: Arial, Helvetica, sans-serif;
          border-collapse: collapse;
          width: 90%;
          margin-top: 20px;
        }

        #customers td,
        #customers th {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
        }

        #customers th {
          padding-top: 8px;
          padding-bottom: 8px;
          background-color: #eee;
          color: #000;
        }
      `}</style>
    </>
  )
}

StatusProduc.getInitialProps = async (ctx) => {
  const URL = URLNogSon()
  const { query } = ctx
  const { id } = query
  const data = await fetch(`${URL}/api/productos/${id}`)
  const producto = await data.json()
  const piezas = await getPiezasFormProducts(producto.piezas, URL)
  return { producto, piezas }
}
