export default function Input({
  value,
  onChange,
  type,
  placeholder,
  label,
  className,
  max,
  defaultValue,
  disabled,
  checked
}) {
  return (
    <div className=''>
      {label && <p className='text-gray-600'>{label}</p>}
      <input
        max={max}
        min={0}
        className={
          !className
            ? 'bg-gray-50 rounded-lg py-1 px-1 w-64 outline-none'
            : className
        }
        type={type}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
        checked={checked}
      />
    </div>
  )
}
