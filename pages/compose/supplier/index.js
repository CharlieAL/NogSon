import Button from 'components/Button'
import Header from 'components/header'
import Input from 'components/Input'
import Nav from 'components/Nav'
import useUser from 'hooks/useUser'
import { useState } from 'react'
import { createSupplier } from 'service/supplier'

export default function index() {
  useUser()
  const [supplier, setSupplier] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    mail: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    createSupplier(supplier)
      .then((data) => {
        setSupplier({
          nombre: '',
          direccion: '',
          telefono: '',
          email: ''
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      <Header text='Supplier'></Header>
      <section>
        <form onSubmit={handleSubmit}>
          <div className='text-center'>
            <Input
              label={'Name'}
              value={supplier.nombre}
              onChange={(e) =>
                setSupplier({ ...supplier, nombre: e.target.value })
              }
            />
          </div>
          <div className='text-center'>
            <Input
              label={'Direction'}
              value={supplier.direccion}
              onChange={(e) =>
                setSupplier({ ...supplier, direccion: e.target.value })
              }
            />
          </div>
          <div className='text-center'>
            <Input
              label={'Phone'}
              type={'tel'}
              value={supplier.telefono}
              onChange={(e) =>
                setSupplier({ ...supplier, telefono: e.target.value })
              }
            />
          </div>
          <div className='text-center'>
            <Input
              label={'mail'}
              type={'email'}
              value={supplier.mail}
              onChange={(e) =>
                setSupplier({ ...supplier, mail: e.target.value })
              }
            />
          </div>
          <div className='text-center pt-5'>
            <Button>save</Button>
          </div>
        </form>
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
