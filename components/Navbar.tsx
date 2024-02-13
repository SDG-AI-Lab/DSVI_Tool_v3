import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiMessageAltDetail } from 'react-icons/bi'
import { MdOutlineVolunteerActivism } from 'react-icons/md'
import { FiMapPin } from 'react-icons/fi'
import { FaRegRegistered } from 'react-icons/fa6'

const Navbar = () => {
  const { state } = useContext(AuthContext)

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
    // refactor these to array that maps Link elements
    <nav className="mb-3 flex items-end align-bottom font-bold ">
      <Link href={'/'} as={`/`}>
        <div className="mr-5 flex px-2 hover:text-gray-900">
          <FiMapPin className={`h-6 w-6  ${returnIconClassname('/')}`} />
          {/* <MapMarker pathname={pathname} /> */}
          <span className={pathname === '/' ? className : 'pl-1'}>Map</span>
        </div>
      </Link>

      {/*// About us*/}
      <Link href="/about">
        <div className="mr-5 flex px-2 font-bold hover:text-gray-900">
          <BiMessageAltDetail
            className={`h-6 w-6  ${returnIconClassname('about')}`}
          />
          {/* <DialogIcon pathname={pathname} /> */}
          <span className={pathname === 'about' ? className : 'pl-1'}>
            About us
          </span>
        </div>
      </Link>

      <Link href="/volunteer">
        <div className="mr-5 flex px-2 font-bold hover:text-gray-900">
          <MdOutlineVolunteerActivism
            className={`h-6 w-6  ${returnIconClassname('volunteer')}`}
          />
          {/* <DialogIcon pathname={pathname} /> */}
          <span className={pathname === 'volunteer' ? className : 'pl-1'}>
            Volunteers
          </span>
        </div>
      </Link>
      {state.user && state.user.role === 'admin' && (
        <Link href="/admin">
          <div className="mr-5 flex px-2 font-bold hover:text-gray-900">
            <FaRegRegistered
              className={`h-6 w-6  ${returnIconClassname('admin')}`}
            />
            {/* <DialogIcon pathname={pathname} /> */}
            <span className={pathname === 'admin' ? className : 'pl-1'}>
              Admin Page
            </span>
          </div>
        </Link>
      )}
    </nav>
  )
}
export default Navbar
