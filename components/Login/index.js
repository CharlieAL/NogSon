import Button from '../Button'
import Input from '../Input'
// import { useState } from 'react'

export default function LoginForm({
  onSubmit,
  error,
  valueName,
  onChangeName,
  valuePassword,
  onChangePassword
}) {
  return (
    <form onSubmit={onSubmit} className='mt-2'>
      {error && (
        <h1 className='text-center font-light text-red-500'>{error}</h1>
      )}
      <div className='text-center'>
        <Input
          type={'text'}
          placeholder={'Username'}
          value={valueName}
          onChange={onChangeName}
        />
      </div>
      <div className='text-center mt-4'>
        <Input
          type={'password'}
          placeholder={'Password'}
          value={valuePassword}
          onChange={onChangePassword}
        />
      </div>
      <div className='text-center mt-3'>
        <Button>Entrar</Button>
      </div>
    </form>
  )
}
