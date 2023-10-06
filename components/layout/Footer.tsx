import Image from 'next/image'
import { GlobeIcon2, TwitterIcon } from '../SVGs'

const Footer = () => {
  return (
    <>
      <footer className="body-font bg-white text-gray-600">
        <ul className="flex items-center px-5">
          <li>
            <a className="title-font flex w-44 items-center font-medium text-gray-900">
              <Image
                src="/images/whitesquare.png"
                alt=""
                width="40px"
                height="40px"
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
              © 2022 — @SDG AI LAB
            </a>
            <a
              className="ml-3 text-gray-500"
              href="https://twitter.com/sdgailab"
            >
              <TwitterIcon />
            </a>
            <a className="ml-3 text-gray-500" href="https://sdgailab.org/">
              <GlobeIcon2 />
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
