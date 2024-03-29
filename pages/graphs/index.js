import Button from 'components/Button'
import Header from 'components/header'
import Nav from 'components/Nav'
import RenderTables from 'components/RenderTable'
import RenderTablesMaterial from 'components/RenderTable/material'
import RenderTableScrap from 'components/RenderTable/scrap'
import RenderTableSupplier from 'components/RenderTable/supplier'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'
import { getScrap } from 'service/scrap'
import { getSupplier } from 'service/supplier'
export default function Graphs() {
  const user = useUser()
  const [estado, setEstado] = useState({
    part: true,
    material: false,
    scrap: false,
    supplier: false
  })
  const [parts, setParts] = useState([])
  const [materials, setMaterials] = useState([])
  const [data, setData] = useState([])
  const [scrap, setScrap] = useState([])
  const [supplier, setSupplier] = useState([])

  // hacer un backend para obtener los datos
  useEffect(() => {
    fetch('/api/piezas')
      .then((res) => res.json())
      .then((data) => {
        setParts(data)
      })
  }, [user])
  useEffect(() => {
    fetch('/api/materials')
      .then((res) => res.json())
      .then((data) => {
        setMaterials(data)
      })
  }, [user])
  useEffect(() => {
    getScrap().then((data) => {
      setScrap(data)
    })
  }, [user])
  useEffect(() => {
    getSupplier().then((data) => {
      setSupplier(data)
    })
  }, [user])

  const handleClick = (e) => {
    if (e.target.id === 'part') {
      setEstado({
        supplier: false,
        part: true,
        material: false,
        scrap: false
      })
      setData(parts)
    } else if (e.target.id === 'material') {
      setEstado({
        product: false,
        part: false,
        material: true,
        scrap: false
      })
      setData(materials)
    } else if (e.target.id === 'scrap') {
      setEstado({
        scrap: true,
        part: false,
        material: false,
        supplier: false
      })
      setData(scrap)
    } else if (e.target.id === 'supplier') {
      setEstado({
        scrap: false,
        part: false,
        material: false,
        supplier: true
      })
      setData(supplier)
    }
  }

  return (
    <>
      <Header text='Inventory'></Header>
      <section>
        <div className='text-center p-5'>
          <Button
            id={'part'}
            onClick={handleClick}
            className={
              estado.part ? 'bg-gray-500 text-white' : 'bg-gray-700 text-white'
            }
          >
            Parts
          </Button>
          <Button
            id={'material'}
            onClick={handleClick}
            className={
              estado.material
                ? 'bg-gray-500 text-white m-2'
                : 'bg-gray-700 text-white m-2'
            }
          >
            Materials
          </Button>
          <Button
            id={'scrap'}
            onClick={handleClick}
            className={
              estado.scrap
                ? 'bg-gray-500 text-white mr-2'
                : 'bg-gray-700 text-white mr-2'
            }
          >
            Scrap
          </Button>
          <Button
            id={'supplier'}
            onClick={handleClick}
            className={
              estado.supplier
                ? 'bg-gray-500 text-white'
                : 'bg-gray-700 text-white'
            }
          >
            supplier
          </Button>
        </div>
        <div className='flex justify-center'>
          {data[0] === undefined ? (
            <RenderTables data={parts} />
          ) : (
            <>
              {estado.part && <RenderTables data={parts} />}
              {estado.material && <RenderTablesMaterial data={materials} />}
              {estado.scrap && <RenderTableScrap data={scrap} />}
              {estado.supplier && <RenderTableSupplier data={supplier} />}
            </>
          )}
        </div>
      </section>
      <Nav></Nav>
      <style jsx>{`
        section {
          flex: 1;
          overflow-y: auto;
        }
        #conteinerButton {
          padding: 10px;
        }
        #customers {
          font-family: Arial, Helvetica, sans-serif;
          border-collapse: collapse;
          width: 90%;
          margin-top: 20px;
        }

        #customers td,
        #customers th {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
        }

        #customers tr:hover {
          background-color: #ddd;
        }

        #customers th {
          padding-top: 8px;
          padding-bottom: 8px;
          background-color: #eee;
          color: #000;
        }
      `}</style>
    </>
  )
}
