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
    <header className="bg-white text-gray-600 body-font  dark:bg-black  dark:text-white">
      <div className={show_sidebar == true ? "container ml-64 mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center" : "container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center"}>
      <button
          className={show_sidebar == true ? 'rounded-3xl bg-white border-2 border-blue-700 px-5 py-2 flex' : 'rounded-3xl bg-white border-2 border-black px-5 py-2 flex'}
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR", payload: {} })}
        >


          <svg xmlns="http://www.w3.org/2000/svg" className={show_sidebar == true ? 'stroke-blue-700 h-6 w-6' : 'h-6 w-6 stroke-slate-700'} fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>

          <span className={show_sidebar == true ? 'px-2 text-blue-700' : 'px-2'}>

            {
              show_sidebar == true ? 'Hide Map Filters':'Show Map Filters'
            }
       


          </span>
        </button>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          

          
          
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
      </div>
    </header>
  )

}
export default Navbar;