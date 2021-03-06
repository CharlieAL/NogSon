import Button from 'components/Button'
import Header from 'components/header'
import Input from 'components/Input'
import Nav from 'components/Nav'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { createFinishGood } from 'service/pendingProduct'
import { getPiezasFormProducts } from 'service/parts'
import { URLNogSon } from 'utils/URL'

export default function StatusProduc(props) {
  const { piezas = [], producto } = props
  const [show, setShow] = useState(false)
  const router = useRouter()
  const [error, setError] = useState('')
  const [finishGood, setFinishGood] = useState({
    cliente: '',
    comprador: '',
    precioVenta: '',
    cantidad: '',
    productoId: producto.id,
    piezas
  })
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
  const handlePrint = (e) => {
    e.preventDefault()
    window.print()
  }
  return (
    <>
      {!show && (
        <Header>
          <Button
            className={'bg-green-600 text-white hover:bg-green-800'}
            onClick={handleSubmit}
          >
            Finish
          </Button>
        </Header>
      )}
      <section>
        {show ? (
          <>
            <div className='text-center'>
              <button
                onClick={() => setShow(!show)}
                className='text-2xl font-light  mt-2'
              >
                NOGSON. Piezas de {producto.nombre}
              </button>
            </div>
            <div className='flex justify-center'>
              <table id={'customers'}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>cantidad utilizada</th>
                    <th>medidas</th>
                  </tr>
                </thead>
                <tbody>
                  {piezas.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nombre}</td>
                      <td>{item.descripcion}</td>
                      <td>{item.cantidad}</td>
                      <td>
                        {item.alto} x {item.ancho}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='text-center m-5'>
              <Button onClick={handlePrint}>Print</Button>
            </div>
          </>
        ) : (
          <>
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
                  onChange={({ target }) =>
                    handleChange('cliente', target.value)
                  }
                  value={finishGood.cliente}
                />
              </div>
              <div className='text-center'>
                <Input
                  placeholder='Buyer'
                  type={'text'}
                  label={'Buyer'}
                  onChange={({ target }) =>
                    handleChange('comprador', target.value)
                  }
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
                  onChange={({ target }) =>
                    handleChange('cantidad', target.value)
                  }
                  value={finishGood.cantidad}
                />
              </div>
              <button className='hidden'></button>
            </form>
            <article className='h-96 overflow-y-auto'>
              {error && (
                <p className='text-red-500 text-center font-light'>{error}</p>
              )}
              <div className='text-center mt-8'>
                <Button
                  onClick={() => {
                    setShow(!show)
                  }}
                >
                  Partes
                </Button>
              </div>
              <div className='text-center mt-8'>
                <Button
                  onClick={() => {
                    setShow(!show)
                  }}
                >
                  Partes
                </Button>
              </div>
            </article>
          </>
        )}
      </section>
      {!show && <Nav></Nav>}
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
