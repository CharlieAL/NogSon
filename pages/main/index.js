import AppLayout from 'components/AppLayout'
import Header from 'components/header'
import CreateSvg from 'components/icons/Create'
import Input from 'components/Input'
import ListProducts from 'components/ListOfProducts'
import Nav from 'components/Nav'
import useUser from 'hooks/useUser'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Main() {
  const [search, setSearch] = useState('')
  const [productos, setProductos] = useState([])
  const [array, setArray] = useState(null)
  const user = useUser()

  useEffect(() => {
    user &&
      fetch('/api/productos')
        .then((res) => res.json())
        .then(setProductos)
  }, [user])
  const handleSearch = (e) => {
    setSearch(e.target.value)
    const data = productos.filter((data) => {
      if (data.nombre.toLowerCase().includes(e.target.value.toLowerCase())) {
        return data
      } else {
        return null
      }
    })
    setArray(data)
  }

  return (
    <>
      <AppLayout>
        <Header text='Productos' />
        <section>
          <div className='flex flex-wrap justify-evenly'>
            {productos.map((data) => (
              <ListProducts
                key={data.id}
                name={data.nombre}
                descripction={data.descripcion}
                custumer={data.custumer}
              />
            ))}
          </div>
        </section>
        <Nav></Nav>
      </AppLayout>
      <style jsx>{`
        header {
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          height: 49px;
          border-bottom: 1px solid #eee;
          position: sticky;
          top: 0;
          width: 100%;
          display: flex;
          align-items: center;
        }
        h1 {
          font-size: 1.5rem;
          font-weight: 600;
          padding: 0 1rem;
        }
        section {
          flex: 1;
          overflow-y: auto;
        }

        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}
