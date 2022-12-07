// import Link from 'next/link'

export default function RenderTableSupplier({ data }) {
  return (
    <>
      <table id='customers'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Direction</th>
            <th>Phone</th>
            <th>Mail</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            // <Link key={item.id} href={`/compose/supplier/${item.id}`}>
            <tr key={item.id} className={'hover:bg-gray-200'}>
              <td>{item.nombre || 'empty'}</td>
              <td>{item.direccion || 'empty'}</td>
              <td>{item.telefono || 'empty'}</td>
              <td>{item.mail || 'empty'}</td>
            </tr>
            // </Link>
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
