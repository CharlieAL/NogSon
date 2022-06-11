import Link from 'next/link'
import CreateSvg from 'components/icons/Create'
import Home from 'components/icons/Home'
import Part from 'components/icons/Part'
import Alert from 'components/icons/Alerts'
import Inventary from 'components/icons/Inventary'
export default function Nav() {
  return (
    <>
      <nav>
        <Link href={'/main'}>
          <a className='flex h-full justify-center a'>
            <Home />
          </a>
        </Link>
        <Link href={'/compose/product'}>
          <a className='flex h-full justify-center a'>
            <CreateSvg />
          </a>
        </Link>
        <Link href={'/compose/part'}>
          <a className='flex h-full justify-center a'>
            <Part />
          </a>
        </Link>
        <Link href={'/compose/product'}>
          <a className='flex h-full justify-center a'>
            <Inventary />
          </a>
        </Link>
        <Link href={'/compose/product'}>
          <a className='flex h-full justify-center a'>
            <Alert />
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
          height: 100%;
          justify-content: center;
        }
      `}</style>
    </>
  )
}
