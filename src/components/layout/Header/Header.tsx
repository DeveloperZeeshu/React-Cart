import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAppContext } from "../../../context/AppContext"
import { Menu, ShoppingCart } from "lucide-react"

interface NavItem {
    name: string
    slug: string
}

const navItems: NavItem[] = [
    {
        name: 'Home',
        slug: '/'
    },
    {
        name: 'Products',
        slug: '/products?category=%5B"all"%5D&sort=all'
    },
    {
        name: 'About Us',
        slug: '/about'
    },
]

const Header = () => {
    const navigate = useNavigate()

    const { cartItems, openSidebar } = useAppContext()

    return (
        <header className="flex justify-between items-center px-6 py-6 shadow-lg fixed w-full bg-white z-20 rounded-b-xl">
            <div>
                <Link className="text-2xl font-medium text-blue-600" to='/'>React Cart</Link>
            </div>
            <nav className="lg:flex space-x-6 hidden">
                {
                    navItems.map(item => (
                        <NavLink
                            className={({ isActive }) => `${isActive ? 'text-blue-600 font-bold' : ''}`}
                            key={item.name}
                            to={item.slug}>
                            {item.name}
                        </NavLink>
                    ))
                }
            </nav>
            <div className="flex gap-6">
                <div className="flex">
                    <span className="absolute h-4.5 flex justify-center items-center w-4.5 -mt-2 ml-3.5 text-white bg-blue-600 rounded-full">{cartItems.length}</span>
                    <ShoppingCart
                        aria-hidden='true'
                        onClick={() => navigate('/cart')}
                        className="cursor-pointer"
                        size={27}
                    />
                </div>
                <Menu onClick={openSidebar} aria-hidden='true' className="text-2xl cursor-pointer lg:hidden" aria-label="open" />

            </div>
        </header>
    )
}

export default Header

