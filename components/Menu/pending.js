import Input from 'components/Input'
import { useState } from 'react'

export default function PendingMenu({ onClick, data, handleUpdate, index }) {
  const [newFG, setNewFG] = useState({
    id: data.id,
    cliente: data.cliente,
    comprador: data.comprador,
    cantidad: data.cantidad,
    fechaSalida: data.defaultValue,
    precioVenta: data.precioVenta,
    precioTotal: data.precioTotal
  })
  const handleChangePrice = (value) => {
    const newPrice = value * newFG.cantidad
    console.log(newPrice)
    setNewFG({ ...newFG, precioTotal: newPrice, precioVenta: value })
  }
  const handleChangeCantidad = (value) => {
    const newPrice = value * newFG.precioVenta
    setNewFG({ ...newFG, precioTotal: newPrice, cantidad: value })
  }

  return (
    <>
      <div id='menuContainer'>
        <main className='bg-white shadow-xl w-3/4 mobile:w-1/2 flex flex-col h-full'>
          <div className='relative'>
            <button onClick={onClick}>❌</button>
          </div>
          <article className=''>
            <p className='text-center'></p>
            <div className='text-center m-2'>
              <Input
                label={'Custumer'}
                defaultValue={data.cliente}
                onChange={(e) => {
                  setNewFG({ ...newFG, cliente: e.target.value })
                }}
              />
            </div>
            <div className='text-center m-2'>
              <Input
                label={'Buyer'}
                defaultValue={data.comprador}
                onChange={(e) => {
                  setNewFG({ ...newFG, comprador: e.target.value })
                }}
              />
            </div>
            <div className='text-center m-2 mb-10'>
              <Input
                label={'Quantity'}
                type={'number'}
                value={newFG.cantidad}
                onChange={(e) => {
                  handleChangeCantidad(e.target.value)
                }}
              />
            </div>
            <div className='text-center m-2 mb-10'>
              <Input
                label={'Sale Date'}
                type={'date'}
                defaultValue={data.fechaSalida}
                onChange={(e) => {
                  setNewFG({ ...newFG, fechaSalida: e.target.value })
                }}
              />
            </div>
            <div className='text-center m-2 mb-10'>
              <Input
                label={'Price'}
                type={'number'}
                value={newFG.precioVenta}
                onChange={(e) => {
                  handleChangePrice(e.target.value)
                }}
              />
            </div>
            <div className='text-center m-2 mb-10'>
              <Input
                label={'Price Sale Total'}
                type={'number'}
                value={newFG.precioTotal}
                disabled={true}
              />
            </div>
            <div className='flex justify-evenly mt-10'>
              <button
                className='px-3 py-1 mr-2 bg-yellow-300 rounded-md'
                onClick={() => handleUpdate(newFG, index)}
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
          </article>
        </main>
      </div>
      <style jsx>{`
        #menuContainer {
          height: 90%;
          width: 100%;
          border-radius: 5px;
          display: flex;
          position: absolute;
          top: 50px;
          backdrop-filter: blur(3px);
          justify-content: center;
        }
      `}</style>
    </>
  )
}
