import { getUser } from 'components/user/client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}

export default function useUser() {
  const router = useRouter()
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)

  useEffect(() => {
    const data = getUser()
    setUser(data)
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push('/')
  }, [user])

  return user
}
