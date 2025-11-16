import { useContext } from "react"
import { FaCartShopping } from "react-icons/fa6"
import { RxHamburgerMenu } from "react-icons/rx"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../../../context/AppContext"

interface NavItem {
    name: string
    slug: string
}

const Header = () => {
    const navigate = useNavigate()
    const context = useContext(AppContext)
    if (!context)
        throw new Error('Context Error.')

    const { cartItems, openSidebar } = context

    const navItems: NavItem[] = [
        {
            name: 'Home',
            slug: '/'
        },
        {
            name: 'Products',
            slug: '/products'
        },
        {
            name: 'About Us',
            slug: '/about'
        },
    ]
    return (
        <header className="flex justify-between items-center px-6 py-6 shadow-lg fixed w-full bg-white z-20">
            <div>
                <Link className="text-xl font-medium" to='/'>React Cart</Link>
            </div>
            <nav className="lg:flex space-x-6 hidden">
                {
                    navItems.map(item => (
                        <Link key={item.name} to={item.slug}>{item.name}</Link>
                    ))
                }
            </nav>
            <div className="flex gap-6">
                <FaCartShopping aria-hidden='true' onClick={() => navigate('/cart')} className="text-2xl cursor-pointer" />
                <RxHamburgerMenu onClick={openSidebar} aria-hidden='true' className="text-2xl cursor-pointer lg:hidden" aria-label="open"/>
                <span className="absolute h-4 flex justify-center items-center w-4 top-3 bg-red-500 rounded-full">{cartItems.length}</span>
            </div>
        </header>
    )
}

export default Header

