import Header from 'components/header'
import Nav from 'components/Nav'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'
import { getFinishGood } from 'service/pendingProduct'
import { useRouter } from 'next/router'

export default function finishGood() {
  const router = useRouter()
  useUser()
  const [finishGood, setFinishGood] = useState([])
  const [update] = useState(false)

  // const [total, setTotal] = useState(0)
  useEffect(() => {
    getFinishGood().then((data) => {
      const { finishGoods } = data
      setFinishGood(finishGoods.filter((item) => item.status === 'finished'))
    })
  }, [update])

  const handleInvoice = (id) => {
    if (id) {
      router.push(`/invoice/${id}`)
    } else {
      return 'not found id'
    }
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
                <th>Sale Date</th>
                <th>Cost Total</th>
                <th>Quantity</th>
                <th>Unit price</th>
                <th>Sale Price</th>
                <th>invoice</th>
              </tr>
            </thead>
            <tbody>
              {finishGood.map((item, index) => (
                <tr key={item.id} id='trId'>
                  <td data-title='Custumer: '>{item.cliente}</td>
                  <td data-title='Buyer: '>{item.comprador}</td>
                  <td data-title='Product: '>{item.productoId.nombre}</td>
                  <td>{item.fechaSalida} </td>
                  <td data-title='Sale Price: '>
                    {new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN'
                    }).format(item.precioTotal)}
                  </td>
                  <td data-title='Quantity: '>{item.cantidad}</td>
                  <td data-title='Cost: '>
                    {new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN'
                    }).format(item.precioVenta)}
                  </td>
                  <td data-title='Sale Price: '>
                    {new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN'
                    }).format(item.precioTotal)}
                  </td>
                  <td>
                    <button
                      onClick={() => handleInvoice(item.id)}
                      className='text-black hover:text-gray-300'
                    >
                      GET
                    </button>
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
          margin
        }

        #trID {
          margin: 10px;
          background-color: #fff;
        }

        table td,
        table th {
          padding: 8px;
          text-align: center;
          border: none;
          border-bottom: 1px solid #ddd;
        }

        table td {
          background-color: #afffaa2d;
          
        }

        table tr {
          background-color: #fff;
        }

        table tbody tr{
          margin-bottom: 20px;
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
