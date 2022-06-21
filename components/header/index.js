import React from 'react'

export default function Header({ text = '', children = ' ' }) {
  return (
    <>
      <header>
        <div className='pl-4 absolute'>
          <img src='/LogoApp.png' />
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
