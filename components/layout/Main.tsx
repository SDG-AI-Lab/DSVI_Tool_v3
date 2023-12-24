import { useContext, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { AuthContext } from '../../context/AuthContext'
import { useRouter } from 'next/router'

const layout = ({ children }) => {
  const { state: authState } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && !authState.user) {
      router.push('/landing')
    }
  }, [authState.user])

  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
export default layout
