import Button from 'components/Button'
import Header from 'components/header'
import Nav from 'components/Nav'
import { useEffect, useState } from 'react'
import { getFinishGood, updateFinishGood } from 'service/finshGood'

export default function finishGood() {
  const [finishGood, setFinishGood] = useState([])
  const [update, setUpdate] = useState(false)
  const [array, setArray] = useState([])
  const [finished, setFinished] = useState(false)
  // const [total, setTotal] = useState(0)
  useEffect(() => {
    getFinishGood().then((data) => {
      const { finishGoods } = data
      setFinishGood(finishGoods)
      setArray(finishGoods)
    })
  }, [update])

  const handleClick = async (id) => {
    try {
      const res = await updateFinishGood({ id })
      console.log(res)
      setUpdate(!update)
    } catch (error) {
      console.log(error)
    }
  }
  const handleClickState = (text) => {
    if (text === 'finished') {
      setFinished(true)
      setArray(finishGood.filter((item) => item.status === 'finished'))
    } else if (text === 'pending') {
      setFinished(false)
      setArray(finishGood.filter((item) => item.status === 'pending'))
    } else {
      setFinished(false)
      setArray(finishGood)
    }
  }

  // const { onDownload } = useDownloadExcel({
  //   currentTableRef: tableRef.current,
  //   filename: 'Users table',
  //   sheet: 'Users'
  // })
  return (
    <>
      <Header text='Pending Products'></Header>
      <section>
        <div className='text-center p-5'>
          <Button
            onClick={() => handleClickState('all')}
            className={'bg-blue-500 active:translate-y-1 text-white '}
          >
            all
          </Button>
          <Button
            onClick={() => handleClickState('finished')}
            className={'bg-green-500 active:translate-y-1 text-white m-2'}
          >
            Finished
          </Button>
          <Button
            onClick={() => handleClickState('pending')}
            className={'bg-yellow-500 active:translate-y-1 text-white'}
          >
            pending
          </Button>
        </div>
        <div>
          {finished && (
            <Button className={'text-white mx-2 bg-green-700'}>
              Export to exel
            </Button>
          )}
        </div>
        <article className='flex justify-center'>
          <table id='table'>
            <caption className='font-bold border-2 text-xl py-2'>
              PRODUCTS
            </caption>
            <thead>
              <tr>
                <th>Custumer</th>
                <th>Buyer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Sale Date</th>
                <th>Sale Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {array.map((item, index) => (
                <tr key={item.id}>
                  <td data-title='Custumer: '>{item.cliente}</td>
                  <td data-title='Buyer: '>{item.comprador}</td>
                  <td data-title='Product: '>{item.productoId.nombre}</td>
                  <td data-title='Quantity: '>{item.cantidad}</td>
                  {item.createdAt !== item.updatedAt ? (
                    <td data-title='Sale Date: '>
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </td>
                  ) : (
                    <td data-title='Sale Date: '>
                      {new Date(Date.now()).toLocaleDateString() + ' (Pending)'}
                    </td>
                  )}

                  <td data-title='Sale Price: '>
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

        table td,
        table th {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
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

            border: 1px solid #ddd;
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
