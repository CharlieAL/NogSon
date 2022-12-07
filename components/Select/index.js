export default function Select({ data, value, onChange, text }) {
  return (
    <select name='select' value={value} onChange={onChange}>
      {data.map((item) => (
        <option key={item.id} value={item.nombre}>
          {item.nombre || 'No Data'}
        </option>
      ))}
    </select>
  )
}
