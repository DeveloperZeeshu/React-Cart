import { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../../../context/AppContext"
import { X } from "lucide-react"

interface NavItem {
    name: string
    slug: string
}

const Sidebar = () => {
    const context = useContext(AppContext)
    if (!context)
        throw new Error('Context Error.')

    const { closeSidebar } = context

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
        <div className="fixed z-20 bg-white right-4 top-4 p-4 rounded-lg shadow-lg w-60">
            <X 
            onClick={closeSidebar} className="text-2xl mb-6" aria-label="close" 
            />
            <div className="flex flex-col gap-2 items-center">
                {
                    navItems.map(item => (
                        <Link onClick={closeSidebar} key={item.name} to={item.slug}>{item.name}</Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar

