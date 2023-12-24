import React, { useContext } from 'react'
import { FilterContext } from '../context/FilterContext'
import Image from 'next/image'
import sdgFilled from '/public/images/logo-sdg-filled.png'
import bg from '../public/images/launch-background.jpeg'
import marker1 from '../public/images/marker1.png'
import undpWhite from '/public/images/logo-undp-white.png'
import sdgAiLab from '../public/images/logo-sdg-ai-lab-black-alpha.png'
import Link from 'next/link'

export default function Landing() {
  const { dispatch } = useContext(FilterContext)
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="flex h-screen flex-col bg-cover bg-no-repeat pl-16 pr-16 text-white"
    >
      <div className="content-center text-center font-bold">
        <h1>DSVI Tool Tajikistan</h1>{' '}
        <p>
          This tool is a collaboration between SDG AI Lab, UN Online Volunteers
          and UNDP Tajikistan
        </p>
      </div>
      <div className="flex shrink grow basis-0 flex-row items-center">
        <div className="basis-1/3">
          <Image src={sdgFilled} alt="Logo" width={300} height={300} />
        </div>
        <div className="basis-1/3 text-center">
          <Link
            href={'register'}
            // onClick={() => dispatch({ type: 'QUIT_HOMEPAGE', payload: false })}
          >
            <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
              Log in / Register
            </button>
          </Link>
        </div>
        <div className="basis-1/3">
          <p>TEXT</p>
        </div>
      </div>
      <div className="flex justify-evenly">
        <div>
          <Image src={marker1} alt="Logo" width={90} height={100} />
        </div>
        <div>
          <Image src={undpWhite} alt="Logo" width={50} height={100} />
        </div>
        <div>
          <Image src={sdgAiLab} alt="Logo" width={100} height={100} />
        </div>
      </div>
    </div>
  )
}
