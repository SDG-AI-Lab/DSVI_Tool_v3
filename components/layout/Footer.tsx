import Image from 'next/image'
import { BsTwitter, BsGlobe } from 'react-icons/bs'

const Footer = () => {
  const iconClassname =
    'h-5 w-5 drop-shadow-lg hover:h-8 hover:w-8 hover:text-blue-400 hover:drop-shadow-2xl'

  return (
    <>
      <footer className="body-font bg-white text-gray-600">
        <ul className="flex items-center px-5">
          <li>
            <a className="title-font flex w-44 items-center font-medium text-gray-900">
              <Image
                src="/images/whitesquare.png"
                alt=""
                width={40}
                height={40}
                layout="intrinsic"
                className=""
              />
              <p className="w-13 pl-2 text-[12px] text-blue-600"></p>
            </a>
          </li>
          <li className="m-auto flex justify-self-center text-sm text-gray-500">
            <a
              href="https://sdgailab.org/"
              className="m-auto items-center text-gray-600"
              rel="noopener noreferrer"
              target="_blank"
            >
              © 2023 — @SDG AI LAB
            </a>
            <a
              className="ml-3 text-gray-500"
              href="https://twitter.com/sdgailab"
            >
              {/* <TwitterIcon /> */}
              <BsTwitter className={iconClassname} />
            </a>
            <a className="ml-3 text-gray-500" href="https://sdgailab.org/">
              <BsGlobe className={iconClassname} />
            </a>
          </li>
          {/* <li key="3">
                        <a className="flex items-center w-44 justify-end">
                            <Image
                                src="/images/logo-undp-alpha.png"
                                alt="undp logo"
                                width="40px"
                                height="60px"
                                layout="intrinsic"
                                className=""
                            />
                        </a>
                    </li> */}
        </ul>
      </footer>
    </>
  )
}
export default Footer
