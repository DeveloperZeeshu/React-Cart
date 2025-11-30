import { Outlet } from 'react-router-dom'
import './index.css'
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <Toaster />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App

