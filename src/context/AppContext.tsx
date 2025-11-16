import { createContext, useCallback, useState, type ReactNode, type SetStateAction } from "react";
import type { AddToCart, Product } from "../types/product";
import toast from "react-hot-toast";

interface AppProviderProps {
    children: ReactNode
}

interface AppContextType {
    products: Product[]
    fetchProducts: () => Promise<void>
    loading: boolean
    cartItems: AddToCart[]
    addToCart: (finalProduct: AddToCart) => void
    quantity: number
    setQuantity: (value: SetStateAction<number>) => void
    editQuantity: (id: number, newQuantity: number) => void
    removeFromCart: (id: number) => void
    isSidebarOpen: boolean
    openSidebar: () => void
    closeSidebar: () => void
}

export const AppContext = createContext<AppContextType | null>(null)

const AppProvider = ({ children }: AppProviderProps) => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [quantity, setQuantity] = useState<number>(1)
    const [cartItems, setCartItems] = useState<AddToCart[]>(() => {
        const items = localStorage.getItem('cart_items')
        return items ? JSON.parse(items) : []
    })

    const openSidebar = () => {
        setIsSidebarOpen(true)
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }

    const fetchProducts = useCallback(async () => {
        try {
            const res = await fetch('https://fakestoreapi.com/products')
            const data: Product[] = await res.json()
            setProducts(data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }, [])

    const addToCart = (product: AddToCart) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id)

            let updatedCart = existing
                ? prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                : [...prev, product]

            localStorage.setItem('cart_items', JSON.stringify(updatedCart))

            return updatedCart
        })

        toast.success('Product added successfully.')
    }

    const editQuantity = (id: number, newQuantity: number) => {
        setCartItems(prevItems => {
            const existing = prevItems.find(item => item.id === id)

            const updatedCart = existing
                ? prevItems.map(item =>
                    item.id === id
                        ? { ...item, quantity: newQuantity }
                        : item
                )
                : prevItems

            localStorage.setItem('cart_items', JSON.stringify(updatedCart))

            return updatedCart
        })
        toast.success('Cart updated successfully.')
    }

    const removeFromCart = (id: number) => {
        setCartItems(prev => {
            const updatedCart = prev.filter(item =>
                item.id !== id
            )

            localStorage.setItem('cart_items', JSON.stringify(updatedCart))
            return updatedCart
        })
        toast.success('Product removed successfully.')
    }

    return <AppContext.Provider value={{
        products,
        loading,
        addToCart,
        cartItems,
        quantity,
        setQuantity,
        editQuantity,
        removeFromCart,
        fetchProducts,
        isSidebarOpen,
        openSidebar,
        closeSidebar
    }}>
        {children}
    </AppContext.Provider>
}

export default AppProvider




