export default function Button({ children, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      className={
        !disabled
          ? 'bg-000 rounded-full px-10 py-1 text-fff mobile:px-20  active:translate-y-1'
          : 'opacity-50 cursor-not-allowed'
      }
      onClick={onClick}
    >
      {children}
    </button>
  )
}
