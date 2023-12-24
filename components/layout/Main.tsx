import { useContext, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { FilterContext } from '../../context/FilterContext'
import { AuthContext } from '../../context/AuthContext'
import { useRouter } from 'next/router'

const layout = ({ children }) => {
  const { state, dispatch } = useContext(FilterContext)
  const on_homepage = state['on_homepage']

  const { state: authState } = useContext(AuthContext)
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined' && !authState.user) {
      router.push('/landing')
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-200">
      {!on_homepage && <Header />}
      {children}
      {!on_homepage && <Footer />}
    </div>
  )
}
export default layout
