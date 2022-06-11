export const getUser = () => {
  const nogsonUser = localStorage.getItem('nogsonUser')
  if (nogsonUser) {
    const user = JSON.parse(nogsonUser)
    return user
  } else {
    return null
  }
}
