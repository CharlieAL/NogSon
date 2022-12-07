import Header from 'components/header'
import PendingMenu from 'components/Menu/pending'
import Nav from 'components/Nav'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'
import {
  getFinishGood,
  updateFG,
  updateFinishGood
} from 'service/pendingProduct'

export default function finishGood() {
  useUser()
  const [finishGood, setFinishGood] = useState([])
  const [update, setUpdate] = useState(false)
  const [status, setStatus] = useState(false)
  const [data, setData] = useState()
  const [index, setIndex] = useState()
  // const [total, setTotal] = useState(0)
  useEffect(() => {
    getFinishGood().then((data) => {
      const { finishGoods } = data
      setFinishGood(finishGoods.filter((item) => item.status === 'pending'))
    })
  }, [update])

  const handleClick = async (id) => {
    try {
      await updateFinishGood({ id })
      setUpdate(!update)
    } catch (error) {}
  }
  const handleOptions = (data, index) => {
    setData(data)
    setIndex(index)
    setStatus(!status)
  }

  const handleUpdate = (newFG, index) => {
    updateFG(newFG)
      .then((data) => {
        setFinishGood([
          ...finishGood.slice(0, index),
          data,
          ...finishGood.slice(index + 1)
        ])
        setStatus(!status)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      {status && (
        <PendingMenu
          onClick={handleOptions}
          data={data}
          index={index}
          handleUpdate={handleUpdate}
        />
      )}
      <Header text='Pending Products'></Header>
      <section>
        <article className='flex justify-center'>
          <table id='table'>
            <thead>
              <tr>
                <th>Custumer</th>
                <th>Buyer</th>
                <th>Product</th>
                <th>Sale Date</th>
                <th>Cost Total</th>
                <th>Quantity</th>
                <th>Unit price</th>
                <th>Sale Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {finishGood.map((item, index) => (
                <tr key={item.id}>
                  <td
                    onClick={() => handleOptions(item, index)}
                    data-title='Custumer: '
                  >
                    {item.cliente}
                  </td>
                  <td
                    onClick={() => handleOptions(item, index)}
                    data-title='Buyer: '
                  >
                    {item.comprador}
                  </td>
                  <td
                    onClick={() => handleOptions(item, index)}
                    data-title='Product: '
                  >
                    {item.productoId.nombre}
                  </td>

                  <td
                    onClick={() => handleOptions(item, index)}
                    data-title='Sale Date: '
                  >
                    {item.fechaSalida}
                  </td>
                  <td
                    onClick={() => handleOptions(item, index)}
                    data-title='Cost: '
                  >
                    {new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN'
                    }).format(item.precioCostoTotal)}
                  </td>
                  <td
                    onClick={() => handleOptions(item, index)}
                    data-title='Quantity: '
                  >
                    {item.cantidad}
                  </td>
                  <td
                    onClick={() => handleOptions(item, index)}
                    data-title='Cost: '
                  >
                    {new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN'
                    }).format(item.precioVenta)}
                  </td>
                  <td
                    onClick={() => handleOptions(item, index)}
                    data-title='Sale Price: '
                  >
                    {new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN'
                    }).format(item.precioTotal)}
                  </td>
                  <td>
                    {item.status === 'pending' ? (
                      <button
                        onClick={(e) => handleClick(item.id)}
                        className='bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-4 rounded-2xl  '
                      >
                        Finish?
                      </button>
                    ) : (
                      <button className='bg-green-500 text-white py-1 px-4 rounded-2xl  '>
                        Finished
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            {/* <tfoot>
              <tr>
                <td>Total</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{total}$</td>
              </tr>
            </tfoot> */}
          </table>
        </article>
      </section>
      <Nav></Nav>
      <style jsx>{`
        section {
          flex: 1;
          overflow-y: auto;
        }
        table {
          font-family: Arial, Helvetica, sans-serif;
          border-collapse: collapse;
          width: 90%;
          margin-top: 20px;
        }

        table tbody tr:hover {
          background-color: #ddd;
        }

        table td,
        table th {
          padding: 8px;
          text-align: center;
          border: none;
          border-bottom: 1px solid #ddd;
        }

        table td {
          background-color: #fffaaa2d;
        }

        table th {
          padding-top: 8px;
          padding-bottom: 8px;
        }

        @media (max-width: 30em) {
          table td,
          table th {
            border: none;
          }
          table tr {
            display: flex;
            flex-direction: column;
            border: solid 2px #ddd;
            padding: 8px;
            margin-bottom: 1em;
          }
          table tr td button {
            width: 100%;
            font-size: 22px;
          }
          table td[data-title] {
            display: flex;
            justify-content: space-between;
            font-size: 24px;
          }
          table td[data-title]::before {
            content: attr(data-title);
            font-weight: bold;
            padding-right: 0.5em;
          }

          table thead {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
