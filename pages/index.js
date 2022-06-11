import { useState, useEffect } from 'react'
import { login } from 'service/auth'
import Image from 'next/image'
import AppLayout from '../components/AppLayout'

import LoginForm from '../components/Login'
import { useRouter } from 'next/router'
import useUser from 'hooks/useUser'

export default function Home() {
  const router = useRouter()

  const user = useUser()
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    user && router.replace('/main')
  }, [user])

  const handleSubminLogin = (e) => {
    e.preventDefault()

    login(name, password)
      .then(() => {
        router.replace('/main')
      })
      .catch((err) => {
        setError(err.response.data.error)
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <>
      {user === null && (
        <AppLayout>
          <section className='pt-44'>
            <div className='text-center'>
              <Image width={90} height={90} src='/logoNog.png' alt='NogSon' />
            </div>
            <h1 className='font-extralight text-center'>nogson app</h1>
            <LoginForm
              onSubmit={handleSubminLogin}
              error={error}
              valueName={name}
              valuePassword={password}
              onChangeName={({ target }) => setName(target.value)}
              onChangePassword={({ target }) => setPassword(target.value)}
            />
          </section>
        </AppLayout>
      )}
      {user === undefined && <div>Loading...</div>}
    </>
  )
}
