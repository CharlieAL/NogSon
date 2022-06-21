import Header from 'components/header'

// import Input from 'components/Input'
import ListProducts from 'components/ListOfProducts'
import Nav from 'components/Nav'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'
import { getProducts } from 'service/products'

export default function Main() {
  // const [search, setSearch] = useState('') create a state for search
  const [productos, setProductos] = useState([])
  // const [array, setArray] = useState(null) search for a product
  const user = useUser()

  useEffect(() => {
    getProducts()
      .then((productos) => {
        setProductos(productos)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [user])
  //  function for search!!!!!
  // const handleSearch = (e) => {
  //   setSearch(e.target.value)
  //   const data = productos.filter((data) => {
  //     if (data.nombre.toLowerCase().includes(e.target.value.toLowerCase())) {
  //       return data
  //     } else {
  //       return null
  //     }
  //   })
  //   setArray(data)
  // }

  return (
    <>
      <Header text='Product Plans'></Header>
      <section>
        <div className='flex flex-wrap justify-evenly'>
          {productos.map((data) => (
            <ListProducts
              key={data.id}
              name={data.nombre}
              descripction={data.descripcion}
              custumer={data.custumer}
              id={data.id}
            />
          ))}
        </div>
      </section>
      <Nav></Nav>
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
