import '../styles/globals.css'
import Main from "../components/layout/Main"
import {FilterProvider} from '../context/FilterContext'
function MyApp({ Component, pageProps }) {
  return (
          <FilterProvider>
              <Main>
                  <Component {...pageProps} />
              </Main>
          </FilterProvider>
  )
}
export default MyApp;
