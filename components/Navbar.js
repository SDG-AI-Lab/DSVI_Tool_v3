import Link from 'next/link'
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';


const Navbar = () => {
  const router = useRouter();
  const pathname = router.pathname.length == 1 && router.pathname == '/' ? router.pathname : router.pathname.substring(1);


  const {systemTheme, theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])
  const renderThemeChanger = () => {

    if (!mounted) return null;
    const currentTheme = theme === 'System' ? systemTheme : theme;
    if (currentTheme === 'dark') {
      return (

        <a class="mr-5 hover:text-gray-900 px-2 flex cursor-pointer"

        onClick={() => setTheme('light')}

      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:stroke-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        <span className={'pl-2 hover:text-blue-900'}



        >Light Mode</span>

        

      </a>


    
      )
    }
    else {
      return (
        <a class="mr-5 hover:text-gray-900 px-2 flex cursor-pointer"

        onClick={() => setTheme('dark')}

      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:stroke-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        <span className={'pl-2 hover:text-blue-900'}



        >Dark Mode</span>

        

      </a>
      )
    }

  }

  return (
    <header class="bg-white text-gray-600 body-font  dark:bg-black  dark:text-white">
      <div class="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">

        <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link href={'/'} as={`/`}>
            <a class="mr-5 hover:text-gray-900 flex px-2">

              <svg xmlns="http://www.w3.org/2000/svg" className={pathname == '/' ? 'stroke-blue-700 h-6 w-6' : 'h-6 w-6 stroke-slate-700'} fill="none" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>{" "}

              <span className={pathname == '/' ? 'text-blue-700 pl-2' : 'pl-2'}>Home</span>


            </a>
          </Link>
          <Link href="/map">
            <a class="mr-5 hover:text-gray-900 px-2 flex ">
            <svg xmlns="http://www.w3.org/2000/svg" className={pathname == 'map1' ? 'stroke-blue-700 h-6 w-6' : 'h-6 w-6 stroke-slate-700'} fill="none" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className={pathname == 'map' ? 'text-blue-700 pl-2' : 'pl-2'}>Map</span>

            </a>
          </Link>

        </nav>

        {
          /**
           * <div>{renderThemeChanger()}</div>
           */
        }

        
       
      </div>
    </header>
  )

}
export default Navbar;