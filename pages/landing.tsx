import React, { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '../context/AuthContext'

export default function Landing() {
  const { state } = useContext(AuthContext)

  return (
    <div
      style={{ backgroundImage: `url(/images/launch-background.jpeg)` }}
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
          <img src="/images/logo-sdg-filled.png" alt="" />
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
        </div>
        <div>
          <img src="../public/images/logo-sdg-ai-lab-black-alpha.png" alt="" />
        </div>
      </div>
    </div>
  )
}
