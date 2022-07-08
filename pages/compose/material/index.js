import Button from 'components/Button'
import DataList from 'components/DataList'
import Header from 'components/header'
import Input from 'components/Input'
import Nav from 'components/Nav'
import { useEffect, useState } from 'react'
import { createMaterial, getMaterials } from 'service/materials'

export default function Index() {
  const [nombre, setNombre] = useState('')
  const [material, setMaterial] = useState({
    id: '',
    nombre: '',
    precio: '',
    descripcion: '',
    cantidad: '',
    minStock: '',
    scrap: false,
    finded: null,
    pieza: false
  })
  const [statusButton, setStatusButton] = useState(false)
  const [message, setMessage] = useState(null)
  const [materials, setMaterials] = useState([])

  useEffect(() => {
    getMaterials().then((materials) => {
      setMaterials(materials)
    })
  }, [])

  const handleChange = (name, value) =>
    setMaterial({ ...material, [name]: value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (material.pieza && material.scrap)
      return messageTime('No puede ser pieza y scrap')
    setStatusButton(true)
    setTimeout(() => {
      setStatusButton(false)
    }, 2000)
    console.log(material)
    createMaterial(material)
      .then((data) => {
        console.log(data, 'data page')
        setMaterial({
          ...material,
          name: '',
          precio: '',
          descripcion: '',
          cantidad: '',
          minStock: '',
          scrap: false,
          finded: false,
          pieza: false
        })
        setNombre('')
        if (data === undefined) return messageTime('Error')
      })
      .catch((error) => {
        const { data } = error.response
        messageTime(data.error)
      })
  }

  function messageTime(message) {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 6000)
  }

  const handleClickSearch = (nombre) => {
    setNombre(nombre)
    const result = materials.find((material) => material.nombre === nombre)
    if (result !== undefined) {
      messageTime('Material encontrado')
      setMaterial({
        ...material,
        id: result.id,
        nombre: result.nombre,
        precio: result.precio,
        descripcion: result.descripcion,
        cantidad: result.cantidad,
        minStock: result.minStock,
        finded: true
      })
    } else {
      setMaterial({
        ...material,
        finded: false,
        nombre
      })
      messageTime('Material not found, a new one will be created')
    }
  }
  return (
    <>
      <Header text='Material'>
        <Button
          onClick={handleSubmit}
          disabled={statusButton}
          className={
            statusButton ? 'cursor-not-allowed' : 'bg-green-500 text-white'
          }
        >
          Save
        </Button>
      </Header>
      <section>
        <div className='text-center text-yellow-600 font-bold'>
          <p>{message && message.toUpperCase()}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='p-14 px-2 mobile:p-3 grid mobile:grid-cols-2 gap-2'>
            <div className='text-center'>
              <DataList
                label={'Search material'}
                placeholder='Enter Name'
                data={materials}
                id={materials}
                value={nombre}
                onChange={(e) => {
                  handleClickSearch(e.target.value)
                }}
              />
            </div>
            <div className='text-center'>
              <Input
                label={'Price'}
                type='number'
                placeholder='Price'
                onChange={(e) => handleChange('precio', e.target.value)}
                value={material.precio}
              />
            </div>
            <div className='text-center'>
              <Input
                placeholder='description'
                type={'text'}
                label={'Description'}
                onChange={(e) => handleChange('descripcion', e.target.value)}
                value={material.descripcion}
              />
            </div>
            <div className='text-center'>
              <Input
                label={'Quantity'}
                type={'Number'}
                onChange={(e) => handleChange('cantidad', e.target.value)}
                value={material.cantidad}
              />
            </div>
            <div className='text-center'>
              <Input
                label={'MinStock'}
                type={'Number'}
                onChange={(e) => handleChange('minStock', e.target.value)}
                value={material.minStock}
              />
            </div>
            <div className='text-center flex flex-wrap justify-center'>
              <Input
                label={'Part?'}
                type={'checkbox'}
                onChange={({ target }) => handleChange('pieza', target.checked)}
                checked={material.pieza}
              />
              <Input
                label={'Scrap?'}
                type={'checkbox'}
                onChange={({ target }) => handleChange('scrap', target.checked)}
                checked={material.scrap}
              />
            </div>
          </div>
          <button disabled={statusButton}></button>
        </form>
      </section>
      <Nav></Nav>
      <style jsx>{`
        section {
          flex: 1;
          overflow-y: auto;
        }
        div {
          padding: 8px;
        }
        p {
          font-size: 16px;
        }
      `}</style>
    </>
  )
}
