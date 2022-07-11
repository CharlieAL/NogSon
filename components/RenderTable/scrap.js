export default function RenderTableScrap({ data }) {
  return (
    <>
      <table id='customers'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>area</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.descripcion}</td>
              <td>{item.area}</td>
              <td>{item.status}</td>
            </tr>
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
