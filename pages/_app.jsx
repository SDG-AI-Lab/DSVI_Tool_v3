import '../styles/globals.css'
import Main from "../components/layout/Main"
import {FilterProvider} from '../context/FilterContext'
import {LegendProvider} from '../context/LegendContext'
function MyApp({ Component, pageProps }) {
  return (
          <FilterProvider>
            <LegendProvider>
            <Main>
                  <Component {...pageProps} />
              </Main>

            </LegendProvider>

          </FilterProvider>
  )
}
export default MyApp;
