import Header from 'components/header'
import Input from 'components/Input'
import Nav from 'components/Nav'
import { useState } from 'react'
import { getPieza, updatePieza } from 'service/parts'
import { useRouter } from 'next/router'

export default function UpdateInvetary({ pieza }) {
  const router = useRouter()
  const [part, setPart] = useState({
    nombre: pieza.nombre,
    descripcion: pieza.descripcion,
    precio: pieza.precio,
    cantidad: 0,
    cantidadTotal: pieza.cantidad,
    minStock: pieza.minStock,
    material: {
      id: pieza.materiales.id,
      nombre: pieza.materiales.nombre,
      descripcion: pieza.materiales.descripcion,
      area: pieza.materiales.areaOnePice
    }
  })

  const handleClickUpdate = (e) => {
    e.preventDefault()
    updatePieza(pieza.id, part).then((pieza) => {
      router.replace('/graphs')
    })
  }
  return (
    <>
      <Header></Header>
      <div id='menuContainer'>
        <main className=''>
          <article className=''>
            <p className='text-center'></p>
            <div className='text-center m-2'>
              <Input
                label={'Name'}
                defaultValue={pieza.nombre}
                onChange={(e) => {
                  setPart({ ...part, nombre: e.target.value })
                }}
              />
            </div>
            <div className='text-center m-2'>
              <Input
                label={'Description'}
                defaultValue={pieza.descripcion}
                onChange={(e) => {
                  setPart({ ...part, descripcion: e.target.value })
                }}
              />
            </div>
            <div className='text-center m-2'>
              <Input
                label={'Price'}
                defaultValue={pieza.precio}
                onChange={(e) => {
                  setPart({ ...part, precio: e.target.value })
                }}
              />
            </div>
            <div className='text-center m-2 '>
              <Input
                label={'Add Quantity'}
                type='number'
                placeholder={pieza.cantidad}
                value={part.cantidad}
                onChange={(e) => {
                  setPart({ ...part, cantidad: e.target.value })
                }}
              />
            </div>
            <div className='text-center m-2 '>
              <Input
                label={'Min Stock'}
                defaultValue={pieza.minStock}
                onChange={(e) => {
                  setPart({ ...part, minStock: e.target.value })
                }}
              />
            </div>
            <div className='text-center m-2 flex flex-wrap justify-center '>
              <Input
                label={'Description of Material'}
                disabled={true}
                defaultValue={pieza.materiales.descripcion}
                onChange={(e) => {
                  setPart({ ...part, minStock: e.target.value })
                }}
              />
              <Input
                disabled={true}
                label={'Name of Material'}
                defaultValue={pieza.materiales.nombre}
                onChange={(e) => {
                  setPart({ ...part, nombre: e.target.value })
                }}
              />
              <Input
                disabled={true}
                label={'Area'}
                defaultValue={pieza.materiales.areaOnePice}
                onChange={(e) => {
                  setPart({ ...part, area: e.target.value })
                }}
              />
            </div>
          </article>
          <div className='flex justify-evenly'>
            <button
              onClick={(e) => {
                handleClickUpdate(e)
              }}
              className='px-3 py-1 mr-2 bg-yellow-300 rounded-md'
            >
              Update
            </button>
            {/* <button
              onClick={(e) => {
                onClickDelete(id)
                onClick(e)
              }}
              className='px-3 py-1 mr-2 bg-red-400 rounded-md'
            >
              Delete
            </button> */}
          </div>
        </main>
      </div>
      <Nav></Nav>
      <style jsx>{`
        #menuContainer {
          flex: 1;
          overflow-y: auto;
        }
      `}</style>
    </>
  )
}

UpdateInvetary.getInitialProps = async (ctx) => {
  const { query } = ctx
  const { id } = query
  const pieza = await getPieza(id)
  if (pieza.materiales === undefined) {
    pieza.materiales = {
      id: '',
      nombre: '',
      descripcion: '',
      areaOnePice: ''
    }
  }
  return { pieza }
}
