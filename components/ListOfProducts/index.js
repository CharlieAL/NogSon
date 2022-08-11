import Menu from 'components/Menu'
import Link from 'next/link'
import { useState } from 'react'

export default function ListProducts({
  name,
  descripction = '',
  id,
  price,
  onClickUpdate,
  onClickDelete,
  index,
  img,
  user
}) {
  const [show, setShow] = useState(false)
  const handleClick = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  return (
    <>
      {show && (
        <Menu
          onClick={handleClick}
          name={name}
          description={descripction}
          price={price}
          id={id}
          onClickUpdate={onClickUpdate}
          onClickDelete={onClickDelete}
          index={index}
        />
      )}
      <article className='shadow-lg w-52 p-2 mb-3 text-center rounded-lg'>
        <Link href={user.level === 'admin' ? `status/${id}` : `pdf/${id}`}>
          <div className='cursor-pointer h-64 hover:border-2'>
            <img
              src={
                img ||
                'https://www.3dcontentcentral.com/showmodels/CONTENTCENTRAL/carrito-1/carrito1374543333.JPG'
              }
              alt='producto'
            />

            <section className='break-words'>
              <p className='pb-3 border-b'>{name}</p>
              {descripction ? (
                <p className='text'>{descripction} </p>
              ) : (
                <p className='text-red-400'>No description</p>
              )}
            </section>
          </div>
        </Link>
        <div id='buttonStyle'>
          {user.level === 'admin' && (
            <button
              onClick={(e) => handleClick(e, id, name, descripction)}
              className='hover:bg-gray-200 rounded-lg px-2 py-1 '
            >
              Options
            </button>
          )}
        </div>
      </article>
      <style jsx>{`
        article {
          padding: 10px 0px;
        }
        p {
          font-weight: 300;
          font-size: 1.3rem;
        }
        #buttonStyle {
          bottom: 0px;
          display: flex;
          justify-content: center;
          border-top: 1px solid #444;
          padding-top: 5px;
        }
      `}</style>
    </>
  )
}
