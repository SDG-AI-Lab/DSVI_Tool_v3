import Link from 'next/link'
import { useRouter } from 'next/router'
import { DialogIcon, MapMarker } from './SVGs'

const Navbar = () => {
  const router = useRouter()
  const pathname =
    router.pathname.length === 1 && router.pathname === '/'
      ? router.pathname
      : router.pathname.substring(1)

  const className = 'pl-1 text-lg font-bold text-blue-700 hover:bg-blue-50'

  return (
    // MAP WINDOW
    <nav className="mb-3 flex items-end align-bottom font-bold ">
      <Link href={'/'} as={`/`}>
        <a className="mr-5 flex px-2 hover:text-gray-900">
          <MapMarker pathname={pathname} />
          <span className={pathname === '/' ? className : 'pl-1'}>
            Map Window
          </span>
        </a>
      </Link>

      {/*// About us*/}
      <Link href="/about">
        <a className="mr-5 flex px-2 font-bold hover:text-gray-900">
          <DialogIcon pathname={pathname} />
          <span className={pathname === 'about' ? className : 'pl-1'}>
            About us
          </span>
        </a>
      </Link>
    </nav>
  )
}
export default Navbar
