import '../styles/globals.css'
import Main from "../components/layout/Main"
import {ThemeProvider} from 'next-themes';
import {FilterProvider} from '../context/FilterContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
        {
      /**
       *  <ThemeProvider enableSystem={true} attribute="class">
       */
    }
   
<FilterProvider>
<Main>
      <Component {...pageProps} />
    </Main>

</FilterProvider>

    {
      /**
       *   </ThemeProvider>
       */
    }
    </>

  

  )
}

export default MyApp
