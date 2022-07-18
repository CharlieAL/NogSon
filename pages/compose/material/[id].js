import Header from 'components/header'
import Input from 'components/Input'
import Nav from 'components/Nav'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getMaterial, updateMaterial } from 'service/materials'
import useUser from 'hooks/useUser'

export default function UpdateInvetary({ pieza }) {
  useUser()
  const router = useRouter()
  const [part, setPart] = useState({
    nombre: pieza.nombre,
    descripcion: pieza.descripcion,
    precio: pieza.precio,
    cantidad: pieza.cantidad,
    minStock: pieza.minStock
  })

  const handleClickUpdate = (e) => {
    e.preventDefault()
    updateMaterial(pieza.id, part).then((pieza) => {
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
            <div className='text-center m-2 mb-10'>
              <Input
                label={'Price'}
                defaultValue={pieza.precio}
                onChange={(e) => {
                  setPart({ ...part, precio: e.target.value })
                }}
              />
            </div>
            <div className='text-center m-2 mb-10'>
              <Input
                label={'Quantity'}
                defaultValue={pieza.cantidad}
                onChange={(e) => {
                  setPart({ ...part, cantidad: e.target.value })
                }}
              />
            </div>
            <div className='text-center m-2 mb-10'>
              <Input
                label={'Min Stock'}
                defaultValue={pieza.minStock}
                onChange={(e) => {
                  setPart({ ...part, minStock: e.target.value })
                }}
              />
            </div>
          </article>
          <div className='flex justify-evenly mt-10'>
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
  const pieza = await getMaterial(id)
  return { pieza }
}
