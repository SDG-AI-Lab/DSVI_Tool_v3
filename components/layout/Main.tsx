import { useContext } from 'react'
import Header from './Header'
import Footer from './Footer'
import { FilterContext } from '../../context/FilterContext'

const layout = ({ children }) => {
  const { state, dispatch } = useContext(FilterContext)
  const on_homepage = state['on_homepage']

  return (
    <div className="min-h-screen bg-slate-200">
      {!on_homepage && <Header />}
      {children}
      {!on_homepage && <Footer />}
    </div>
  )
}
export default layout
