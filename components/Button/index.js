export default function Button({ children, onClick, disabled, className, id }) {
  const handleClassname = () => {
    if (className) {
      return `${className} mobile:px-20 px-2 py-1 rounded-full`
    }
    return !disabled
      ? 'bg-000 rounded-full py-1 text-fff mobile:px-20 px-2  active:translate-y-1'
      : ' opacity-50 cursor-not-allowed'
  }
  return (
    <button
      id={id}
      disabled={disabled}
      className={handleClassname()}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
