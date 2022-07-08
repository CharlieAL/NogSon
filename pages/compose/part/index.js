import DataList from 'components/DataList'
import Header from 'components/header'
import Input from 'components/Input'
import Nav from 'components/Nav'
import { useEffect, useState } from 'react'
import { getPiezas } from 'service/parts'

export default function index() {
  const [nombre, setNombre] = useState('')
  const [piezas, setPiezas] = useState([])
  const [part, setPart] = useState({
    precio: '',
    descripcion: '',
    cantidad: '',
    alto: '',
    ancho: '',
    minStock: '',
    materiales: {
      _id: '',
      nombre: '',
      cantidadUsada: ''
    }
  })
  useEffect(() => {
    getPiezas().then((data) => {
      setPiezas(data)
    })
  }, [])
  const handleChangeList = (nombre) => {
    setNombre(nombre)
    const result = piezas.find((item) => item.nombre === nombre)
    console.log(result)
    if (result === undefined) return
    if (result.materiales === undefined) {
      setPart({
        ...part,
        precio: result.precio,
        descripcion: result.descripcion,
        cantidad: result.cantidad,
        alto: result.alto || '',
        ancho: result.largo || '',
        minStock: result.minStock
      })
    } else {
      setPart({
        ...part,
        precio: result.precio,
        descripcion: result.descripcion,
        cantidad: result.cantidad,
        alto: result.alto || '',
        ancho: result.largo || '',
        minStock: result.minStock,
        materiales: {
          _id: result.materiales._id,
          nombre: result.materiales.nombre || '',
          cantidadUsada: result.materiales.cantidadUsada || ''
        }
      })
    }
  }

  const handleonSubmit = (e) => {
    e.preventDefault()
    console.log(part)
  }
  return (
    <>
      <Header text='Part Compose'></Header>
      <section>
        <main>
          <form onSubmit={handleonSubmit}>
            <div className='p-14 px-2 mobile:p-3 grid mobile:grid-cols-2 gap-2'>
              <div className='text-center'>
                <DataList
                  id={'piezas'}
                  data={piezas}
                  label={'Name'}
                  placeholder={'Name'}
                  onChange={(e) => {
                    handleChangeList(e.target.value)
                  }}
                  value={nombre}
                />
              </div>
              <div className='text-center'>
                <Input
                  label={'Price'}
                  placeholder={'price'}
                  onChange={(e) => {
                    setPart({ ...part, precio: e.target.value })
                  }}
                  value={part.precio}
                />
              </div>
              <div className='text-center'>
                <Input
                  label={'Description'}
                  placeholder={'Description'}
                  onChange={(e) => {
                    setPart({ ...part, descripcion: e.target.value })
                  }}
                  value={part.descripcion}
                />
              </div>
              <div className='text-center'>
                <Input
                  label={'Quantity'}
                  placeholder={'Quantity'}
                  onChange={(e) => {
                    setPart({ ...part, cantidad: e.target.value })
                  }}
                  value={part.cantidad}
                />
              </div>
              <div className='text-center'>
                <Input
                  label={'MinStock'}
                  placeholder={'MinStock'}
                  onChange={(e) => {
                    setPart({ ...part, minStock: e.target.value })
                  }}
                  value={part.minStock}
                />
              </div>
              <div className='text-center flex flex-wrap justify-center'>
                <Input
                  label={'Height'}
                  placeholder={'Height'}
                  type={'number'}
                  onChange={(e) => {
                    setPart({ ...part, alto: e.target.value })
                  }}
                  value={part.alto}
                />
                <p className='p-1'></p>
                <Input
                  label={'Width'}
                  placeholder={'Width'}
                  type={'number'}
                  onChange={(e) => {
                    setPart({ ...part, ancho: e.target.value })
                  }}
                  value={part.ancho}
                />
              </div>
            </div>
            <div className='text-center flex flex-wrap justify-center'>
              <Input
                label={'Material Name'}
                placeholder={'Name'}
                onChange={(e) => {
                  setPart({
                    ...part,
                    materiales: {
                      ...part.materiales,
                      nombre: e.target.value
                    }
                  })
                }}
                value={part.materiales.nombre}
              />
              <p className='p-1'></p>
              <Input
                label={'Amount Used'}
                placeholder={'Amount'}
                type={'number'}
                onChange={(e) => {
                  setPart({
                    ...part,
                    materiales: {
                      ...part.materiales,
                      cantidadUsada: e.target.value
                    }
                  })
                }}
                value={part.materiales.cantidadUsada}
              />
            </div>
            <button></button>
          </form>
        </main>
      </section>
      <Nav></Nav>
      <style jsx>{`
        section {
          flex: 1;
          overflow-y: hidden;
        }
      `}</style>
    </>
  )
}
