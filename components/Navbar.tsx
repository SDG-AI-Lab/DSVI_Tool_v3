import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiMessageAltDetail } from 'react-icons/bi'
import { MdOutlineVolunteerActivism } from 'react-icons/md'
import { FiMapPin } from 'react-icons/fi'

const Navbar = () => {
  const router = useRouter()
  const pathname =
    router.pathname.length === 1 && router.pathname === '/'
      ? router.pathname
      : router.pathname.substring(1)

  const returnIconClassname = (path: string): string => {
    return pathname === path ? 'text-blue-700 font-bold' : 'text-slate-700'
  }

  const className = 'pl-1 text-lg font-bold text-blue-700 hover:bg-blue-50'

  return (
    // MAP WINDOW
    <nav className="mb-3 flex items-end align-bottom font-bold ">
      <Link href={'/'} as={`/`}>
        <a className="mr-5 flex px-2 hover:text-gray-900">
          <FiMapPin className={`h-6 w-6  ${returnIconClassname('/')}`} />
          {/* <MapMarker pathname={pathname} /> */}
          <span className={pathname === '/' ? className : 'pl-1'}>
            Map Window
          </span>
        </a>
      </Link>

      {/*// About us*/}
      <Link href="/about">
        <a className="mr-5 flex px-2 font-bold hover:text-gray-900">
          <BiMessageAltDetail
            className={`h-6 w-6  ${returnIconClassname('about')}`}
          />
          {/* <DialogIcon pathname={pathname} /> */}
          <span className={pathname === 'about' ? className : 'pl-1'}>
            About us
          </span>
        </a>
      </Link>

      <Link href="/volunteer">
        <a className="mr-5 flex px-2 font-bold hover:text-gray-900">
          <MdOutlineVolunteerActivism
            className={`h-6 w-6  ${returnIconClassname('volunteer')}`}
          />
          {/* <DialogIcon pathname={pathname} /> */}
          <span className={pathname === 'volunteer' ? className : 'pl-1'}>
            Our Volunteers
          </span>
        </a>
      </Link>
    </nav>
  )
}
export default Navbar
