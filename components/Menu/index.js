import Input from 'components/Input'
import { useState } from 'react'
import { upload } from 'service/upload'

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
  const [imageSelected, setImageSelected] = useState('')
  const [msg, setMsg] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    upload(imageSelected).then((data) => {
      setMsg(data.message)
      setTimeout(() => {
        setMsg('')
      }, 3000)
    })
  }

  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageSelected(file)
    }
  }
  return (
    <>
      <div id='menuContainer'>
        <main className='bg-white shadow-xl w-3/4 mobile:w-1/2 h-3/4 '>
          <div className='relative'>
            <button onClick={onClick}>❌</button>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-xl text-white font-light w-full text-center bg-green-500'>
              {msg}
            </h1>
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
            <div className='text-center m-2 mb-10'>
              <div className='flex justify-center items-center'>
                <Input
                  label={'PDF'}
                  type={'file'}
                  onChange={handleFile}
                  className='file:bg-red-600 file:rounded-xl file:border-none file:hover:bg-red-500 file:px-2 file:py-1 file:text-white file:text-sm'
                />
                <button
                  onClick={handleSubmit}
                  className='text-green-500 font-bold bg-green-200 p-2 rounded-xl active:translate-y-1 hover:bg-green-400'
                >
                  add pdf
                </button>
              </div>
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
