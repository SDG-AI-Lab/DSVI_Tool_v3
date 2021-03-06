import Link from 'next/link'
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';


const Navbar = () => {
  const router = useRouter();
  const pathname = router.pathname.length == 1 && router.pathname == '/' ? router.pathname : router.pathname.substring(1);
  const { state, dispatch } = useContext(FilterContext);
  const show_sidebar = state["show_sidebar"];
  return (
    <nav className="flex items-end pb-3">
      <Link href={'/'} as={`/`}>
      <a className="mr-5 hover:text-gray-900 px-2 flex ">
        <svg xmlns="http://www.w3.org/2000/svg" className={pathname == 'map1' ? 'stroke-blue-700 h-6 w-6' : 'h-6 w-6 stroke-slate-700'} fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className={pathname == '/' ? 'text-blue-700 pl-2' : 'pl-2'}>Map</span>
        </a>
      </Link>
      <Link href="/about">
        <a className="mr-5 hover:text-gray-900 px-2 flex ">
        <svg xmlns="http://www.w3.org/2000/svg" className={pathname == 'about' ? 'stroke-blue-700 h-6 w-6' : 'h-6 w-6 stroke-slate-700'} fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
          <span className={pathname == 'about' ? 'text-blue-700 pl-2' : 'pl-2'}>About</span>
        </a>
      </Link>
    </nav>  
  )

}
export default Navbar;