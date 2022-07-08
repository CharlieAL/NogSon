import Input from 'components/Input'
import { useState } from 'react'

export default function Menu({
  onClick,
  price,
  name,
  id,
  description,
  onClickUpdate,
  onClickDelete,
  index
}) {
  const [producto, setProducto] = useState({
    id,
    nombre: name,
    descripcion: description,
    precio: price
  })
  return (
    <>
      <div id='menuContainer'>
        <main className='bg-white shadow-xl w-3/4 mobile:w-1/2 h-3/4 '>
          <div className='relative'>
            <button onClick={onClick}>❌</button>
          </div>
          <article className='h-80'>
            <p className='text-center'></p>
            <div className='text-center m-2'>
              <Input
                label={'Name'}
                defaultValue={name}
                onChange={(e) => {
                  setProducto({ ...producto, nombre: e.target.value })
                }}
              />
            </div>
            <div className='text-center m-2'>
              <Input
                label={'Description'}
                defaultValue={description}
                onChange={(e) => {
                  setProducto({ ...producto, descripcion: e.target.value })
                }}
              />
            </div>
            <div className='text-center m-2 mb-10'>
              <Input
                label={'Price'}
                defaultValue={price}
                onChange={(e) => {
                  setProducto({ ...producto, precio: e.target.value })
                }}
              />
            </div>
          </article>
          <div className='flex justify-evenly mt-10'>
            <button
              onClick={(e) => {
                onClickUpdate(producto, index)
                onClick(e)
              }}
              className='px-3 py-1 mr-2 bg-yellow-300 rounded-md'
            >
              Update
            </button>
            <button
              onClick={(e) => {
                onClickDelete(id)
                onClick(e)
              }}
              className='px-3 py-1 mr-2 bg-red-400 rounded-md'
            >
              Delete
            </button>
          </div>
        </main>
      </div>
      <style jsx>{`
        #menuContainer {
          height: 90%;
          width: 100%;
          border-radius: 5px;
          display: flex;
          position: absolute;
          backdrop-filter: blur(3px);
          justify-content: center;
        }
      `}</style>
    </>
  )
}
