import Link from 'next/link'

export default function RenderTables({ data }) {
  return (
    <>
      <table id='customers'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Min Stock</th>
            <th>Supplier</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <Link key={item.id} href={`/compose/part/${item.id}`}>
              <tr
                key={item.id}
                className={
                  item.cantidad > item.minStock
                    ? 'hover:bg-gray-200'
                    : 'text-red-500 font-bold hover:bg-gray-200'
                }
              >
                <td>{item.nombre || 'empty'}</td>
                <td>{item.descripcion || 'empty'}</td>
                <td>{item.precio || 'empty'}</td>
                <td>{item.cantidad}</td>
                <td>{item.minStock}</td>
                <td>{item.proveedor || 'NO'}</td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
      <style jsx>{`
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
