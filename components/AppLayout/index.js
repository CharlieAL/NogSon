import Head from 'next/head'
import { breakpoint } from 'styles/theme'
export default function AppLayout({ children }) {
  return (
    <>
      <Head>
        <title>NogSon</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/picApp.png' />
      </Head>

      <div className='grid place-items-center h-screen'>
        <main>{children}</main>
      </div>
      <style jsx>{`
        main {
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          overflow-y: auto;
          width: 100%;
        }

        {/* @media (min-width: ${breakpoint.mobile}) {
          main {
            height: 90vh;
            width: 1000px;
          } */}
        }
      `}</style>
    </>
  )
}
