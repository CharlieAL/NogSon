export default function DataList({
  value,
  onChange,
  type,
  placeholder,
  label,
  className,
  id,
  data = []
}) {
  return (
    <div className=''>
      {label && <p className='text-gray-600'>{label}</p>}
      <input
        list={id}
        className={
          !className
            ? 'bg-gray-50 rounded-lg py-1 px-1 w-64 outline-none'
            : `${className} rounded-lg py-1 px-1 w-64 outline-none`
        }
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <datalist id={id}>
        {data.map((item) => (
          <option key={item.id} value={item.nombre}>
            {item.descripcion}
          </option>
        ))}
      </datalist>
    </div>
  )
}
