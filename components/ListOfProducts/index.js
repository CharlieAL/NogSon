import Link from 'next/link'

export default function ListProducts({ name, image, descripction = '', id }) {
  return (
    <>
      <Link href={`/status/${id}`}>
        <article className='shadow-lg w-52 p-2 mb-3 text-center rounded-lg cursor-pointer hover:border-2 hover:border-gray-300'>
          <img
            src='https://www.3dcontentcentral.com/showmodels/CONTENTCENTRAL/carrito-1/carrito1374543333.JPG'
            alt='producto'
          />
          <section className='break-words'>
            <p className='pb-3 border-b'>{name}</p>
            {descripction ? (
              <p className='text'>{descripction}</p>
            ) : (
              <p className='text-red-400'>No description</p>
            )}
          </section>
        </article>
      </Link>
      <style jsx>{`
        article {
          padding: 10px 15px;
        }
        p {
          font-weight: 300;
          font-size: 1.3rem;
        }
      `}</style>
    </>
  )
}
