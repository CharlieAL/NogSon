export default function ListProducts({ name, image, descripction }) {
  return (
    <>
      <article className='shadow-lg w-52 p-2 mb-3 text-center rounded-lg'>
        <img
          src='https://www.3dcontentcentral.com/showmodels/CONTENTCENTRAL/carrito-1/carrito1374543333.JPG'
          alt='producto'
        />
        <section className='break-words'>
          <p>{name}</p>
          <p>{descripction}</p>
        </section>
      </article>
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
