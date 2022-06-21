import Button from 'components/Button'
import Header from 'components/header'
import Input from 'components/Input'
import Nav from 'components/Nav'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { createFinishGood } from 'service/finshGood'
import getPiezasFormProducts from 'service/parts'

export default function StatusProduc(props) {
  const { piezas, producto } = props
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
      const data = await createFinishGood(finishGood)
      console.log(data)
      router.push('/')
    } catch ({ response }) {
      const { data } = response
      setError(data.error)
    }
  }
  if (producto === null) {
    return <p>Loading.....</p>
  }
  return (
    <>
      <Header text={producto.nombre}>
        <Button
          className={'bg-green-600 text-white hover:bg-green-800'}
          onClick={handleSubmit}
        >
          Finish
        </Button>
      </Header>
      <section>
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
          <button className='hidden'></button>
        </form>
        <article className='h-96 overflow-y-auto'>
          {error && (
            <p className='text-red-500 text-center font-light'>{error}</p>
          )}
          <div className='flex justify-center pt-1 overflow-y-auto'>
            <table id='customers'>
              <caption className='font-bold border-2 text-xl py-2'>
                REQUIRED PARTS
              </caption>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Units Needed </th>
                  <th>Total Units</th>
                </tr>
              </thead>
              <tbody>
                {piezas.map((item, index) =>
                  item.cantidadTotal < item.cantidad ? (
                    <tr key={index}>
                      <td className='text-red-500'>{item.nombre}</td>
                      <td className='text-red-500'>{item.descripcion}</td>
                      <td className='text-red-500'>{item.cantidad}U</td>
                      <td className='text-red-500'>{item.cantidadTotal}U</td>
                    </tr>
                  ) : (
                    <tr key={index}>
                      <td>{item.nombre}</td>
                      <td>{item.descripcion}</td>
                      <td>{item.cantidad} U</td>
                      <td>{item.cantidadTotal}U</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
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

        #customers tr:hover {
          background-color: #ddd;
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

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/productos')
  const productos = await res.json()
  console.log(productos)
  const paths = productos.map((producto) => ({
    params: { id: producto.id }
  }))
  console.log(paths)
  return {
    paths,
    fallback: 'blocking' // false or 'blocking'
  }
}

export async function getStaticProps(context) {
  console.log(context)
  const { params } = context
  const data = await fetch(`http://localhost:3000/api/productos/${params.id}`)
  const producto = await data.json()
  const piezas = await getPiezasFormProducts(producto.piezas)
  return {
    props: {
      producto,
      piezas
    }
  }
}
