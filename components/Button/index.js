export default function Button({ children, onClick, disabled, className, id }) {
  const handleClassname = () => {
    if (className) {
      return `${className} mobile:px-15 px-10 py-1 rounded-full`
    }
    return !disabled
      ? 'bg-000 rounded-full px-10 py-1 text-fff mobile:px-15  active:translate-y-1'
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
