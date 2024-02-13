import React, { useContext } from 'react'
import Image from 'next/image'
import sdgFilled from '/public/images/logo-sdg-filled.png'
import bg from '../public/images/launch-background.jpeg'
// import marker1 from '../public/images/marker1.png'
// import undpWhite from '/public/images/logo-undp-white.png'
// import sdgAiLab from '../public/images/logo-sdg-ai-lab-black-alpha.png'
import Link from 'next/link'
import { AuthContext } from '../context/AuthContext'

export default function Landing() {
  const { state } = useContext(AuthContext)
  // do checkAuth here

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="flex h-screen flex-col bg-cover bg-no-repeat pl-16 pr-16 text-white"
    >
      <div className="content-center text-center font-bold">
        <h1>DSVI Tool</h1>{' '}
        <p>
          This tool is a collaboration between SDG AI Lab, UN Online Volunteers
          and UNDP
        </p>
      </div>
      <div className="flex shrink grow basis-0 flex-row items-center">
        <div className="basis-1/3">
          <Image src={sdgFilled} alt="Logo" width={300} height={300} />
        </div>
        {state.user && state.user.role === 'admin' && (
          <div className="basis-1/3 text-center">
            <Link href={'register'}>
              <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                Register new user
              </button>
            </Link>
          </div>
        )}
        {!state.user && (
          <div className="basis-1/3 text-center">
            <Link href={'login'}>
              <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                Log in
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="flex justify-evenly">
        <div>
          <img src="/images/marker1.png" alt="Logo" width={90} height={100} />
        </div>
        <div>
          <img
            src="/images/logo-undp-white.png"
            alt="Logo"
            width={90}
            height={100}
          />
          {/* <Image src={undpWhite} alt="Logo" width={50} height={100} /> */}
        </div>
        <div>
          <img src="../public/images/logo-sdg-ai-lab-black-alpha.png" alt="" />
          {/* <Image src={sdgAiLab} alt="Logo" width={100} height={100} /> */}
        </div>
      </div>
    </div>
  )
}
