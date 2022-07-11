import Button from 'components/Button'
import Header from 'components/header'
import Nav from 'components/Nav'
import RenderTables from 'components/RenderTable'
import RenderTableScrap from 'components/RenderTable/scrap'
import { useEffect, useState } from 'react'
import { getScrap } from 'service/scrap'
export default function Graphs() {
  const [estado, setEstado] = useState({
    part: true,
    material: false,
    scrap: false
  })
  const [parts, setParts] = useState([])
  const [materials, setMaterials] = useState([])
  const [data, setData] = useState([])
  const [scrap, setScrap] = useState([])

  // hacer un backend para obtener los datos
  useEffect(() => {
    fetch('/api/piezas')
      .then((res) => res.json())
      .then((data) => {
        setParts(data)
      })
  }, [estado])
  useEffect(() => {
    fetch('/api/materials')
      .then((res) => res.json())
      .then((data) => {
        setMaterials(data)
      })
  }, [estado])
  useEffect(() => {
    getScrap().then((data) => {
      setScrap(data)
    })
  }, [estado])

  const handleClick = (e) => {
    if (e.target.id === 'part') {
      setEstado({
        product: false,
        part: true,
        material: false
      })
      setData(parts)
    } else if (e.target.id === 'material') {
      setEstado({
        product: false,
        part: false,
        material: true
      })
      setData(materials)
    } else if (e.target.id === 'scrap') {
      setEstado({
        scrap: true,
        part: false,
        material: false
      })
      setData(scrap)
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
              estado.scrap ? 'bg-gray-500 text-white' : 'bg-gray-700 text-white'
            }
          >
            Scrap
          </Button>
        </div>
        <div className='flex justify-center'>
          {data[0] === undefined ? (
            <RenderTables data={parts} />
          ) : (
            <>
              {estado.part && <RenderTables data={parts} />}
              {estado.material && <RenderTables data={materials} />}
              {estado.scrap && <RenderTableScrap data={scrap} />}
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
