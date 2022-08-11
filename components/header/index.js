import React from 'react'
import { logout } from 'service/auth'

export default function Header({
  text = '',
  children = ' ',
  user = { name: 'wait ...' }
}) {
  return (
    <>
      <header>
        <div className='pl-4 absolute flex'>
          <img src='/LogoApp.png' />
          <a href='' onClick={logout} className='text-xs font-extralight ml-2'>
            log Out
          </a>
        </div>
        <div className=' flex-1'>
          <p className='font-thin '>{text}</p>
        </div>
        <div className='pr-4 absolute right-1'>
          <div className=''>{children}</div>
        </div>
      </header>
      <style jsx>{`
        header {
          border-bottom: 1px solid #eaeaea;
          width: 100%;
          position: sticky;
          top: 0;
          display: flex;
          height: 49px;
          align-items: center;
          text-align: center;
          justify-content: ;
        }

        h1 {
          font-size: 1.5rem;
          font-weight: 600;
          padding: 0 1rem;
        }

        img {
          width: 70px;
        }

        p {
        }
      `}</style>
    </>
  )
}
