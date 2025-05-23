import { Outlet } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'

const ClientLayout = () => {
  return (
    <div className="flex flex-col height-screen">
      <Header />
      <section className="flex-1 w-full max-w-6xl mx-auto">
        <Outlet />
      </section>
      <Footer />
    </div>
  )
}

export default ClientLayout
