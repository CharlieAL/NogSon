import React from 'react'

export default function Header({ text, children }) {
  return (
    <>
      <header>
        <h1 className='pl-4'>{text}</h1>
        <div className='flex-1'>
          <div className='flex justify-end pr-10'>{children}</div>
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
        }

        h1 {
          font-size: 1.5rem;
          font-weight: 600;
          padding: 0 1rem;
        }
      `}</style>
    </>
  )
}
