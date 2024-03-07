import Image from 'next/image'
import { BsTwitter, BsGlobe } from 'react-icons/bs'

const Footer = () => {
  const iconClassname =
    'h-5 w-5 drop-shadow-lg hover:h-8 hover:w-8 hover:text-blue-400 hover:drop-shadow-2xl'

  return (
    <>
      <footer className="body-font bg-white text-gray-600">
        <ul className="flex items-center px-5">
          <li className="m-auto flex justify-self-center text-sm text-gray-500">
            <a
              href="https://sdgailab.org/"
              className="m-auto items-center text-gray-600"
              rel="noopener noreferrer"
              target="_blank"
            >
              © 2024 — @SDG AI LAB
            </a>
            <a
              className="ml-3 text-gray-500"
              href="https://twitter.com/sdgailab"
            >
              <BsTwitter className={iconClassname} />
            </a>
            <a className="ml-3 text-gray-500" href="https://sdgailab.org/">
              <BsGlobe className={iconClassname} />
            </a>
          </li>
          {/* <li>
            <a className="flex w-44 items-center justify-end">
              <img
                src="/images/logo-undp-alpha.png"
                alt="undp logo"
                width="40px"
                height="60px"
              />
            </a>
          </li> */}
        </ul>
      </footer>
    </>
  )
}
export default Footer
