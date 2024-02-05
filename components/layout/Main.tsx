import Header from './Header'
import Footer from './Footer'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

const layout = ({ children }) => {
  const { state } = useContext(AuthContext)
  const { checkAuth } = useAuth()
  console.log(state.user)
  useEffect(() => {
    checkAuth({ protectedRoute: false })
  }, [])

  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
export default layout
