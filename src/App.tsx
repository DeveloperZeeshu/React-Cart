import { Outlet } from 'react-router-dom'
import './index.css'
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import { Toaster } from 'react-hot-toast'
import Sidebar from './components/layout/Sidebar/Sidebar'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'

const App = () => {
  const context = useContext(AppContext)
  if (!context)
    throw new Error('Context Error.')

  const { isSidebarOpen } = context
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <Toaster />
      {isSidebarOpen && <Sidebar />}
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App

