import Button from 'components/Button'
import DataList from 'components/DataList'
import Header from 'components/header'
import Input from 'components/Input'
import Nav from 'components/Nav'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'
import { getMaterials } from 'service/materials'
import { createPart } from 'service/parts'
import { getScrap } from 'service/scrap'
import uploadImage from 'service/uploadImage'

export default function index() {
  useUser()
  const [searchScrap, setSearchScrap] = useState(false)
  const [nameMaterial, setNameMaterial] = useState('')
  const [nameScrap, setNameScrap] = useState('')
  const [message, setMessage] = useState('')
  const [part, setPart] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    cantidad: '',
    alto: '',
    ancho: '',
    minStock: '',
    materiales: {
      id: '',
      nombre: '',
      descripcion: '',
      areaOnePice: ''
    }
  })
  const [scrap, setScrap] = useState({
    nombre: '',
    descripcion: '',
    area: '',
    same: false
  })
  const [materialesMedidas, setMaterialesMedidas] = useState({
    nombre: '',
    descripcion: '',
    alto: '',
    ancho: '',
    cantidad: ''
  })
  const [scrapMedidas, setScrapMedidas] = useState({
    id: '',
    area: '',
    status: ''
  })
  const [scraps, setScraps] = useState([])
  const [materials, setMaterials] = useState([])
  const [pathImage, setPathImage] = useState('')
  const [imageSelected, setImageSelected] = useState(false)
  useEffect(() => {
    getMaterials().then((data) => {
      setMaterials(data)
    })
    getScrap().then((data) => {
      setScraps(data)
    })
  }, [])

  function messageTime(message) {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 6000)
  }

  const handleChangeDataMaterial = (name) => {
    setNameMaterial(name)
    const result = materials.find((item) => item.descripcion === name)
    if (result === undefined) return
    setPart({
      ...part,
      materiales: {
        ...part.materiales,
        id: result.id,
        descripcion: result.descripcion,
        nombre: result.nombre
      }
    })
    setMaterialesMedidas({
      ...materialesMedidas,
      nombre: result.nombre,
      descripcion: result.descripcion,
      alto: result.altura,
      ancho: result.largo,
      cantidad: result.cantidad
    })
  }

  const handleChangeDataScrap = (name) => {
    setNameScrap(name)
    const result = scraps.find((item) => item.descripcion === name)
    if (result === undefined) return
    setScrapMedidas({
      ...scrapMedidas,
      id: result.id,
      nombre: result.nombre,
      area: result.area,
      descripcion: result.descripcion,
      status: result.status
    })
    setPart({
      ...part,
      materiales: {
        ...part.materiales,
        id: result.id,
        descripcion: result.descripcion,
        nombre: result.nombre
      }
    })
  }

  const handleAreaMaterial = () => {
    if (!searchScrap) {
      const areaM = materialesMedidas.alto * materialesMedidas.ancho
      const areaP = part.alto * part.ancho
      setPart({
        ...part,
        materiales: {
          ...part.materiales,
          areaOnePice: areaP
        }
      })
      const areaPTotal = areaP * part.cantidad
      if (part.cantidad === '')
        return messageTime(`la cantidad maxima es:${Math.floor(areaM / areaP)}`)
      if (areaPTotal > areaM)
        return messageTime(`solo se pueden crear ${Math.floor(areaM / areaP)}`)
      const areaRestante = areaM - areaPTotal
      messageTime('sucesfully')
      setScrap({
        ...scrap,
        nombre: materialesMedidas.nombre,
        descripcion: materialesMedidas.descripcion,
        area: areaRestante
      })
      return { areaRestante }
    } else {
      const areaP = part.alto * part.ancho
      const areaM = scrapMedidas.area
      const areaPTotal = areaP * part.cantidad
      if (part.cantidad === '')
        return messageTime(`la cantidad maxima es:${Math.floor(areaM / areaP)}`)
      if (areaPTotal > areaM)
        return messageTime(`solo se pueden crear ${Math.floor(areaM / areaP)}`)
      const areaRestante = areaM - areaPTotal
      setPart({
        ...part,
        materiales: {
          ...part.materiales,
          areaOnePice: areaP
        }
      })
      setScrap({
        ...scrap,
        id: scrapMedidas.id,
        nombre: scrapMedidas.nombre,
        descripcion: scrapMedidas.descripcion,
        area: areaRestante,
        same: true
      })
      messageTime('sucesfully')
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    uploadImage(imageSelected)
      .then((imageURL) => {
        const body = {
          part,
          scrap,
          imageURL
        }
        return body
      })
      .then((body) => {
        createPart(body)
          .then((data) => {
            setPart({
              ...part,
              nombre: '',
              precio: '',
              descripcion: '',
              cantidad: '',
              alto: '',
              ancho: '',
              minStock: '',
              materiales: {
                nombre: '',
                areaOnePice: ''
              }
            })
            setScrap({
              ...scrap,
              nombre: '',
              descripcion: '',
              area: '',
              same: false
            })
            setMaterialesMedidas({
              ...materialesMedidas,
              nombre: '',
              descripcion: '',
              alto: '',
              ancho: '',
              cantidad: ''
            })
            setScrapMedidas({
              ...scrapMedidas,
              id: '',
              area: '',
              status: ''
            })
            setNameMaterial('')
            setNameScrap('')
          })
          .catch((error) => {
            console.log(error)
          })
      })
  }

  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageSelected(file)
      if (file.type.includes('image')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          setPathImage(e.target.result)
        }
      }
    }
  }

  return (
    <>
      <Header text='Part Compose'>
        <Button onClick={handleOnSubmit}>save</Button>
      </Header>
      <section>
        <main className='mb-10'>
          <div>
            <div className='p-5 px-2 mobile:p-3 grid mobile:grid-cols-2 gap-2'>
              <div className='text-center'>
                <Input
                  id={'piezas'}
                  label={'Name'}
                  placeholder={'Name'}
                  onChange={(e) => {
                    setPart({ ...part, nombre: e.target.value })
                  }}
                  value={part.nombre}
                />
              </div>
              <div className='text-center'>
                <Input
                  label={'Price'}
                  type={'number'}
                  placeholder={'price'}
                  onChange={(e) => {
                    setPart({ ...part, precio: e.target.value })
                  }}
                  value={part.precio}
                />
              </div>
              <div className='text-center'>
                <Input
                  label={'Description'}
                  placeholder={'Description'}
                  onChange={(e) => {
                    setPart({ ...part, descripcion: e.target.value })
                  }}
                  value={part.descripcion}
                />
                {/* <textarea
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  placeholder={'Image'}
                ></textarea> */}
                <Input
                  type={'file'}
                  onChange={handleFile}
                  className={
                    ' text-sm text-slate-500 file:rounded-full file:bg-black file:px-2 file:py-1 file:border-none file:text-white file:text-sm mt-5 '
                  }
                />
              </div>
              <div className='text-center'>
                <Input
                  label={'MinStock'}
                  placeholder={'MinStock'}
                  onChange={(e) => {
                    setPart({ ...part, minStock: e.target.value })
                  }}
                  value={part.minStock}
                />
                <Input
                  type={'checkbox'}
                  label={'Buscar En Scrap'}
                  onChange={(e) => {
                    setSearchScrap(e.target.checked)
                  }}
                  value={searchScrap}
                />
              </div>
            </div>
            <p className='text-center text-xl font-light text-yellow-400'>
              {message}
            </p>
            <div className='text-center flex flex-wrap justify-center'>
              <div className='text-center'>
                <Input
                  label={'Quantity'}
                  placeholder={'Quantity'}
                  onChange={(e) => {
                    setPart({ ...part, cantidad: e.target.value })
                  }}
                  value={part.cantidad}
                />
              </div>
              <div className='text-center mx-3'>
                <Input
                  label={'Height'}
                  placeholder={'Height'}
                  type={'number'}
                  onChange={(e) => {
                    setPart({ ...part, alto: e.target.value })
                  }}
                  value={part.alto}
                />
              </div>
              <div className='text-center'>
                <Input
                  label={'Width'}
                  placeholder={'Width'}
                  type={'number'}
                  onChange={(e) => {
                    setPart({ ...part, ancho: e.target.value })
                  }}
                  value={part.ancho}
                />
              </div>
            </div>
            {!searchScrap ? (
              <div className='text-center flex flex-wrap justify-center'>
                <DataList
                  id={'materials'}
                  label={'Material Name'}
                  placeholder={'Name'}
                  data={materials}
                  onChange={(e) => {
                    handleChangeDataMaterial(e.target.value)
                  }}
                  value={nameMaterial}
                />
                <div className='text-center mx-3'>
                  <Input
                    label={'Height'}
                    placeholder={'Height'}
                    type={'number'}
                    readOnly={true}
                    value={materialesMedidas.alto}
                  />
                </div>
                <div className='text-center'>
                  <Input
                    label={'Width'}
                    placeholder={'Width'}
                    type={'number'}
                    readOnly={true}
                    value={materialesMedidas.ancho}
                  />
                </div>
              </div>
            ) : (
              <div className='text-center flex flex-wrap justify-center'>
                <DataList
                  id={'materials'}
                  label={'Scrap Name'}
                  placeholder={'Name'}
                  data={scraps}
                  onChange={(e) => {
                    handleChangeDataScrap(e.target.value)
                  }}
                  value={nameScrap}
                />
                <div className='text-center mx-3'>
                  <Input
                    label={'Area'}
                    placeholder={'Area'}
                    type={'number'}
                    readOnly={true}
                    value={scrapMedidas.area}
                  />
                </div>
                <div className='text-center'>
                  <Input
                    label={'Status Material'}
                    placeholder={'Status'}
                    readOnly={true}
                    value={scrapMedidas.status}
                  />
                </div>
              </div>
            )}
            <div className='text-center mt-5'>
              <Button onClick={handleAreaMaterial}>calcular</Button>
            </div>
          </div>
        </main>
        <div className='flex justify-center'>
          <img
            className='w-96 '
            src={pathImage || '/logoApp.png'}
            alt={'Image Here'}
          />
        </div>
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
