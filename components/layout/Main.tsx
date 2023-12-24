import Header from './Header'
import Footer from './Footer'

const layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
export default layout
