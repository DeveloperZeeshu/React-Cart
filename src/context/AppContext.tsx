import { createContext, useCallback, useContext, useMemo, useState, type ChangeEvent, type ReactNode, type SetStateAction } from "react";
import type { AddToCart, Product } from "../types/product";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import type { CategoriesType } from "../components/ui/FilterProducts";

interface AppProviderProps {
    children: ReactNode
}

interface AppContextType {
    products: Product[]
    product?: Product | null
    loading: boolean
    cartItems: AddToCart[]
    quantity: number
    productLoading: boolean
    sortBy: string
    category: string[]
    updatedProducts: Product[]

    addToCart: (finalProduct: AddToCart) => void
    setQuantity: (value: SetStateAction<number>) => void
    editQuantity: (id: number, newQuantity: number) => void
    removeFromCart: (id: number) => void
    fetchAllProducts: () => Promise<void>
    fetchProductById: (id?: number) => Promise<void>
    handleSortChange: (e: ChangeEvent<HTMLSelectElement>) => void
    handleCategoryChange: (item: CategoriesType) => void
}

export const AppContext = createContext<AppContextType | null>(null)

const AppProvider = ({ children }: AppProviderProps) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [productLoading, setProductLoading] = useState<boolean>(true)

    const [category, setCategory] = useState<string[]>(() => {
        const categories = searchParams.get('category')
        return categories ? categories.split(',') : ['all']
    })
    const [sortBy, setSortBy] = useState<string>(() => {
        const sort = searchParams.get('sort')
        return sort ? sort : 'all'
    })

    const [quantity, setQuantity] = useState<number>(1)
    const [cartItems, setCartItems] = useState<AddToCart[]>(() => {
        const items = localStorage.getItem('cart_items')
        return items ? JSON.parse(items) : []
    })

    //Fetching Products

    const fetchProductById = useCallback(async (id?: number) => {
        setProductLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API}/products/${id}`)
            const data: Product = await res.json()
            setProduct(data)
        } catch (err) {
            console.log(err)
        } finally {
            setProductLoading(false)
        }
    }, [])

    const fetchAllProducts = useCallback(async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API}/products`)
            const data: Product[] = await res.json()
            setProducts(data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }, [])


    //Cart Operations

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

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value
        setSortBy(newSort)
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set('sort', newSort)
        setSearchParams(newSearchParams)
    }

    const handleCategoryChange = (item: CategoriesType) => {
        const newSearchParams = new URLSearchParams(searchParams)

        let updatedCateg = [...category]
        if (item.slug === 'all')
            updatedCateg = ['all']

        else if (updatedCateg.includes(item.slug)) {
            updatedCateg = updatedCateg.filter(ct =>
                ct !== item.slug
            )
            if (updatedCateg.length === 0) updatedCateg.push('all')
        } else {
            updatedCateg.push(item.slug)
            updatedCateg = updatedCateg.filter(ct =>
                ct !== 'all'
            )
        }

        setCategory(updatedCateg)
        newSearchParams.set('category', updatedCateg.join(','))
        setSearchParams(newSearchParams)
    }

    const updatedProducts = useMemo(() => {
        let existingProd = [...products]

        if (sortBy === 'price_asc') {
            existingProd.sort((a, b) => a.price - b.price)
        } else if (sortBy === 'price_desc') {
            existingProd.sort((a, b) => b.price - a.price)
        }

        if (!category.includes('all')) {
            existingProd = existingProd.filter(item =>
                category.includes(item.category)
            )
        }

        return existingProd
    }, [products, sortBy, category])

    return <AppContext.Provider value={{
        products,
        loading,
        product,
        addToCart,
        cartItems,
        quantity,
        setQuantity,
        editQuantity,
        removeFromCart,
        fetchAllProducts,
        fetchProductById,
        productLoading,
        sortBy,
        category,
        handleSortChange,
        handleCategoryChange,
        updatedProducts
    }}>
        {children}
    </AppContext.Provider>
}

export default AppProvider


export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context)
        throw new Error('Context Api Error.')

    return context
}

