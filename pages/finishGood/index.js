import Header from 'components/header'
import Nav from 'components/Nav'
import { useEffect, useState } from 'react'
import { getFinishGood, updateFinishGood } from 'service/pendingProduct'

export default function finishGood() {
  const [finishGood, setFinishGood] = useState([])
  const [update, setUpdate] = useState(false)

  // const [total, setTotal] = useState(0)
  useEffect(() => {
    getFinishGood().then((data) => {
      const { finishGoods } = data
      setFinishGood(finishGoods.filter((item) => item.status === 'finished'))
    })
  }, [update])

  const handleClick = async (id) => {
    try {
      await updateFinishGood({ id })
      setUpdate(!update)
    } catch (error) {}
  }
  return (
    <>
      <Header text='Finish-Good'></Header>
      <section>
        <article className='flex justify-center'>
          <table id='table'>
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
              {finishGood.map((item, index) => (
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
          padding: 8px;
          text-align: center;
          border: none;
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
