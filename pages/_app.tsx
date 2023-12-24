import '../styles/globals.css'
import Main from '../components/layout/Main'
import { FilterProvider } from '../context/FilterContext'
import { LegendProvider } from '../context/LegendContext'
import { AuthProvider } from '../context/AuthContext'
import { toast, ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FilterProvider>
        <LegendProvider>
          <Main>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              pauseOnHover={false}
            />
            <Component {...pageProps} />
          </Main>
        </LegendProvider>
      </FilterProvider>
    </AuthProvider>
  )
}
export default MyApp
