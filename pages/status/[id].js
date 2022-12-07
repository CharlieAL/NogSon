import Button from 'components/Button'
import Header from 'components/header'
import Input from 'components/Input'
import Nav from 'components/Nav'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { createFinishGood } from 'service/pendingProduct'
import { getPiezasFormProducts } from 'service/parts'
import { URLNogSon } from 'utils/URL'
import Link from 'next/link'
// import { sendInstructions } from 'service/instructions'

export default function StatusProduc(props) {
  const { piezas = [], producto } = props
  const router = useRouter()
  const [error, setError] = useState('')
  // const [statusButton, setStatusButton] = useState(false)
  const [finishGood, setFinishGood] = useState({
    cliente: '',
    comprador: '',
    precioCosto: producto.precio,
    precioVenta: 0,
    cantidad: '',
    productoId: producto.id,
    fechaSalida: '',
    piezas
  })
  // const [message, setMessage] = useState(false)
  const handleChange = (name, value) =>
    setFinishGood({ ...finishGood, [name]: value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createFinishGood(finishGood)
      router.push('/')
    } catch ({ response }) {
      const { data } = response
      setError(data.error)
    }
  }
  if (producto === null) {
    return <p>Loading.....</p>
  }
  // const handlePrint = (e) => {
  //   e.preventDefault()
  //   window.print()
  // }

  // const handleSend = (e) => {
  //   e.preventDefault()
  //   const { imageURL, nombre, descripcion } = producto
  //   const objectToSend = {
  //     imageURL,
  //     nombre,
  //     descripcion,
  //     piezas
  //   }
  //   setStatusButton(true)
  //   setTimeout(() => {
  //     setStatusButton(false)
  //   }, 2000)
  //   sendInstructions(objectToSend).then((res) => {
  //     console.log(res)
  //     setMessage(res.msg)
  //     setTimeout(() => {
  //       setMessage(false)
  //     }, 2000)
  //   })
  // }
  return (
    <>
      <Header>
        <Button
          className={'bg-green-600 text-white hover:bg-green-800'}
          onClick={handleSubmit}
        >
          Finish
        </Button>
      </Header>

      <section>
        <div className='bg-green-500 text-center text-white absolute w-full'>
          {/* <p className='font-light'>{message}</p> */}
        </div>
        <form
          onSubmit={handleSubmit}
          className=' px-2 mobile:p-3 grid mobile:grid-cols-2 gap-2'
        >
          <div className='text-center'>
            <Input
              label={'Name'}
              placeholder='Name'
              defaultValue={producto.nombre}
              disabled={true}
            />
          </div>
          <div className='text-center'>
            <Input
              label={'Price'}
              type='number'
              placeholder='Price'
              defaultValue={producto.precio}
              disabled={true}
            />
          </div>
          <div className='text-center'>
            <Input
              placeholder='description'
              type={'text'}
              label={'Description'}
              defaultValue={producto.descripcion}
              disabled={true}
            />
          </div>
          <div className='text-center'>
            <Input
              placeholder='Custumer'
              type={'text'}
              label={'Custumer'}
              onChange={({ target }) => handleChange('cliente', target.value)}
              value={finishGood.cliente}
            />
          </div>
          <div className='text-center'>
            <Input
              placeholder='Buyer'
              type={'text'}
              label={'Buyer'}
              onChange={({ target }) => handleChange('comprador', target.value)}
              value={finishGood.comprador}
            />
          </div>
          <div className='text-center'>
            <Input
              placeholder='Sale Price'
              type={'Number'}
              label={'Sale Price'}
              onChange={({ target }) =>
                handleChange('precioVenta', target.value)
              }
              value={finishGood.precioVenta}
            />
          </div>
          <div className='text-center'>
            <Input
              placeholder='Quantity'
              type={'Number'}
              label={'Quantity'}
              onChange={({ target }) => handleChange('cantidad', target.value)}
              value={finishGood.cantidad}
            />
          </div>
          <div className='text-center'>
            <Input
              type={'date'}
              label={'date of delivery'}
              onChange={({ target }) =>
                handleChange('fechaSalida', target.value)
              }
              value={finishGood.fechaSalida}
            />
          </div>
          <button className='hidden'></button>
        </form>
        <article className='h-96 overflow-y-auto'>
          {error && (
            <p className='text-red-500 text-center font-light'>{error}</p>
          )}
          <div className='justify-center mt-8 flex'>
            <table id='customers'>
              <thead>
                <tr>
                  <th>Measures</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Units Need</th>
                  <th>Quantity</th>
                  <th>Min Stock</th>
                  <th>Supplier</th>
                </tr>
              </thead>
              <tbody>
                {piezas.map((item, index) => (
                  <Link key={item.id} href={`/compose/part/${item.id}`}>
                    <tr
                      key={item.id}
                      className={
                        item.cantidadTotal > item.minStock
                          ? 'hover:bg-gray-200'
                          : 'text-red-500 font-bold hover:bg-gray-200'
                      }
                    >
                      {item.altura ? (
                        <td>{item.altura + 'x' + item.ancho}</td>
                      ) : (
                        <td>NO</td>
                      )}
                      <td>{item.nombre || 'empty'}</td>
                      <td>{item.descripcion || 'empty'}</td>
                      <td>{item.precio || 'empty'}</td>
                      <td>{item.cantidad}</td>
                      <td>{item.cantidadTotal}</td>
                      <td>{item.minStock}</td>
                      <td>{item.proveedor || 'NO'}</td>
                    </tr>
                  </Link>
                ))}
              </tbody>
            </table>
            {/* <div className='p-2'>
                  <Button
                    className={
                      statusButton
                        ? 'opacity-50 cursor-not-allowed '
                        : 'bg-green-600 text-white hover:bg-green-800'
                    }
                    onClick={handleSend}
                    disabled={statusButton}
                  >
                    Send to Up
                  </Button>
                </div> */}
          </div>
        </article>
      </section>
      <Nav></Nav>
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
