import '../styles/globals.css'
import Main from "../components/layout/Main"
import {ThemeProvider} from 'next-themes';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">

<Main>
      <Component {...pageProps} />
    </Main>
    </ThemeProvider>

  )
}

export default MyApp
