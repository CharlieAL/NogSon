import Link from 'next/link'
// import CreateSvg from 'components/icons/Create'
// import Home from 'components/icons/Home'
// import Part from 'components/icons/Part'
// import Alert from 'components/icons/Alerts'
// import Inventary from 'components/icons/Inventary'
export default function Nav() {
  return (
    <>
      <nav>
        <Link href={'/main'}>
          <a className='flex h-full justify-center'>
            {/* <Home /> */}
            <div>Home</div>
          </a>
        </Link>
        <Link href={'/compose/product'}>
          <a className='flex h-full justify-center'>
            {/* <CreateSvg /> */}
            <div>Create</div>
          </a>
        </Link>
        <Link href={'/compose/part'}>
          <a className='flex h-full justify-center'>
            {/* <Part /> */}
            <div>Part</div>
          </a>
        </Link>

        <Link href={'/compose/material'}>
          <a className='flex h-full justify-center'>
            <div>M</div>
          </a>
        </Link>
        <Link href={'/compose/pending'}>
          <a className='flex h-full justify-center'>
            <div>Stock</div>
          </a>
        </Link>
        <Link href={'/graphs'}>
          <a className='flex h-full justify-center'>
            <div>Inv</div>
          </a>
        </Link>
        <Link href={'/finishGood'}>
          <a className='flex h-full justify-center'>
            <div>FG</div>
          </a>
        </Link>
      </nav>
      <style jsx>{`
        nav {
          border-top: 1px solid #eaeaea;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          width: 100%;
          position: sticky;
          bottom: 0;
          height: 49px;
          display: flex;
          justify-content: space-around;
        }
        nav a {
          align-items: center;
          width: 50px;
          justify-content: center;
        }

        nav a:hover {
          background: radial-gradient(#00033233 16%, transparent 16%);
          background-size: 190px 190px;
          background-position: center;
        }
      `}</style>
    </>
  )
}
