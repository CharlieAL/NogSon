import Button from 'components/Button'
import DataList from 'components/DataList'
import Header from 'components/header'
import Input from 'components/Input'
import Nav from 'components/Nav'
import useUser from 'hooks/useUser'
import { useState, useEffect } from 'react'
import { createProduct } from 'service/products'

export default function ComposeProduct() {
  useUser()
  const [array, setArray] = useState([])
  const [update, setUpdate] = useState(false)
  const [max, setMax] = useState(0)
  const [piezas, setPiezas] = useState([])
  const [error, setError] = useState(null)
  const [statusButton, setStatusButton] = useState(false)
  const [pieza, setPieza] = useState({
    nombre: '',
    id: '',
    cantidad: ''
  })
  const [producto, setProducto] = useState({
    nombre: '',
    img: '',
    precio: '',
    descripcion: ''
  })

  useEffect(() => {
    fetch('/api/piezas')
      .then((res) => res.json())
      .then((data) => {
        setPiezas(data)
      })
  }, [update])
  const handleChangePieza = (name, value) =>
    setPieza({ ...pieza, [name]: value })

  const handleChangeProducto = (name, value) =>
    setProducto({ ...producto, [name]: value })

  const handleChangeList = ({ value }) => {
    handleChangePieza('nombre', value)
    piezas.filter((data) => {
      if (data.nombre.toLowerCase() === value.toLowerCase()) {
        setMax(data.cantidad)
        return data
      } else {
        return null
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProduct = {
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      piezas: array
    }
    createProduct(newProduct)
      .then((data) => {
        setProducto({
          nombre: '',
          img: '',
          precio: '',
          descripcion: ''
        })
        setArray([])
        setMax(0)
        setUpdate(!update)
        setStatusButton(true)
        setTimeout(() => {
          setStatusButton(false)
        }, 2000)
      })
      .catch((err) => {
        setError(err.response.data.error)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (pieza.nombre !== '' && pieza.quantity !== '') {
      if (pieza.cantidad <= max) {
        setArray(array.concat(pieza))
        setPieza({
          nombre: '',
          cantidad: ''
        })
        setUpdate(!update)
      } else {
        setError(
          'La cantidad de piezas no puede ser mayor a la cantidad disponible'
        )
        handleChangePieza('cantidad', max)
        setTimeout(() => {
          setError('')
        }, 3000)
      }
    }
  }

  const handleDelete = (index) => {
    setUpdate(!update)
    array.splice(index, 1)
  }
  return (
    <>
      <Header text='Compose Product'>
        <Button disabled={statusButton} onClick={handleSubmit}>
          Save
        </Button>
      </Header>
      <section>
        <div className='p-14 px-2 mobile:p-3 grid mobile:grid-cols-2 gap-2'>
          <div className='text-center'>
            <Input
              label={'Name'}
              placeholder='Name'
              onChange={({ target }) =>
                handleChangeProducto('nombre', target.value)
              }
              value={producto.nombre}
            />
          </div>
          <div className='text-center'>
            <Input
              label={'Price'}
              type='number'
              placeholder='Price'
              onChange={({ target }) =>
                handleChangeProducto('precio', target.value)
              }
              value={producto.precio}
            />
          </div>
          <div className='text-center'>
            <Input
              placeholder='description'
              type={'text'}
              label={'Description'}
              onChange={({ target }) =>
                handleChangeProducto('descripcion', target.value)
              }
              value={producto.descripcion}
            />
          </div>
          <div className='text-center'>
            <Input
              label={'image'}
              type={'file'}
              className={
                ' text-sm text-slate-500 file:rounded-full file:bg-black file:px-2 file:py-1 file:border-none file:text-white file:text-sm '
              }
            />
          </div>
        </div>
        <div className=''>
          {error && (
            <p className='text-red-500 text-center font-light'>{error}</p>
          )}
          <div className='grid grid-cols-3 gap-2 p-3'>
            <div className='text-center pt-4 border-b-2 p-4'>
              <DataList
                data={piezas}
                id={'piezas'}
                placeholder={'piezas'}
                className={'w-28'}
                onChange={({ target }) => handleChangeList(target)}
                value={pieza.nombre}
              />
            </div>
            <div className='text-center pt-4 border-b-2'>
              <Input
                max={max}
                placeholder={max}
                type={'number'}
                className={'w-24'}
                onChange={({ target }) =>
                  handleChangePieza('cantidad', target.value)
                }
                value={pieza.cantidad}
              />
            </div>
            <div className='text-center pt-4 border-b-2'>
              <a
                className='font-bold cursor-pointer text-green-500 hover:text-green-600'
                onClick={handleClick}
              >
                Add
              </a>
            </div>
          </div>
          {array.map((item, index) => (
            <article key={index} className='grid grid-cols-3 gap-2 p-3'>
              <div className='text-center pt-4 border-b-2 p-4'>
                <h1>{item.nombre}</h1>
              </div>
              <div className='text-center pt-4 border-b-2'>
                <h1>{item.cantidad} u</h1>
              </div>
              <div className='text-center pt-4 border-b-2'>
                <a
                  className='font-bold cursor-pointer text-red-500 hover:text-red-700'
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Nav></Nav>
      <style jsx>{`
        section {
          flex: 1;
          overflow-y: auto;
        }
      `}</style>
    </>
  )
}
