import '../styles/globals.css'
import Main from '../components/layout/Main'
import { FilterProvider } from '../context/FilterContext'
import { LegendProvider } from '../context/LegendContext'
import { AuthProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FilterProvider>
        <LegendProvider>
          <Main>
            <Component {...pageProps} />
          </Main>
        </LegendProvider>
      </FilterProvider>
    </AuthProvider>
  )
}
export default MyApp
