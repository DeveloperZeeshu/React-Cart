import { useCallback, useEffect, useMemo, useState, type ChangeEvent } from "react"
import Container from "../components/container/Container"
import ProductCard from "../components/ui/ProductCard"
import { IoMdSearch } from "react-icons/io"
import Input from "../components/ui/Input"
import { useSearchParams } from "react-router-dom"
import type { Product } from "../types/product"

interface FilterState {
    sort: string
    category: string[]
}

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState<FilterState>({
        sort: searchParams.get('sort') || '',
        category: searchParams.get('category')?.split(',') || []
    })

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        const newFilters = { ...filters, sort: value }

        setFilters(newFilters)

        const newParams = new URLSearchParams();
        if (newFilters.category.length > 0) {
            newParams.set("category", newFilters.category.join(","));
        }
        if (newFilters.sort) newParams.set("sort", newFilters.sort);

        setSearchParams(newParams)
    }

    const handleCategoryChange = (category: string) => {
        const newCategories = filters.category.includes(category)
            ? filters.category.filter(c => c !== category)
            : [...filters.category, category];

        const newFilters = { ...filters, category: newCategories }

        setFilters(newFilters)

        const newParams = new URLSearchParams();
        if (newFilters.category.length > 0) newParams.set("category", newFilters.category.join(","));
        if (newFilters.sort) newParams.set("sort", newFilters.sort);

        setSearchParams(newParams);
    }

    const fetchDynamicProducts = useCallback(async () => {
        try {
            if (filters.category.length === 0) {
                const res = await fetch(`https://fakestoreapi.com/products`)
                const data = await res.json()
                setProducts(data)
                return
            }

            const promises = filters.category.map(categ =>
                fetch(`https://fakestoreapi.com/products/category/${categ}`)
                    .then(res => res.json())
            )

            const results = await Promise.all(promises)

            const mergedProducts = results.flat()

            setProducts(mergedProducts)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }, [filters.category])

    const updatedProduct = useMemo(() => {
        const existingProd = [...products]

        if (filters.sort === 'price_aesc') {
            existingProd.sort((a, b) => a.price - b.price)
        } else if (filters.sort === 'price_desc') {
            existingProd.sort((a, b) => b.price - a.price)
        }

        return existingProd
    }, [filters.sort, products])

    useEffect(() => {
        fetchDynamicProducts()
    }, [fetchDynamicProducts])

    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            sort: searchParams.get('sort') || '',
            category: searchParams.get('category')?.split(',') || []
        }))
    }, [searchParams])

    if (loading) {
        return (
            <Container>
                <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            </Container>
        )
    }

    if (!products && !loading)
        return <p>Products not found.</p>

    return (
        <Container>
            <form className="flex gap-4 w-full max-w-xl mb-12">
                <Input
                    type="search"
                    className="w-full shadow-lg"
                    placeholder="Search for product e.g., men's t'shirt"
                />
                <button
                    type="submit"
                    aria-label="search"
                    className="text-2xl px-3 rounded-lg bg-black text-white shadow-lg"
                >
                    <IoMdSearch aria-hidden='true' />
                </button>
            </form>

            <div className="flex lg:w-4xl gap-6 justify-between mb-4">
                <div className="flex text-sm flex-col">
                    <span className="font-medium pb-1">Filter by Category</span>
                    <label className="">
                        <input
                            checked={filters.category.includes("men's clothing")}
                            onChange={() => handleCategoryChange("men's clothing")}
                            name="category"
                            type="checkbox"
                            value="men's clothing" /> Men's Clothing
                    </label>
                    <label className="">
                        <input
                            checked={filters.category.includes('jewelery')}
                            onChange={() => handleCategoryChange('jewelery')}
                            name="category" type="checkbox"
                            value="jewelery" /> Jewelery
                    </label>
                    <label className="">
                        <input
                            checked={filters.category.includes('electronics')}
                            onChange={() => handleCategoryChange('electronics')} name="category" type="checkbox"
                            value="electronics" /> Electronics
                    </label>
                    <label className="">
                        <input
                            checked={filters.category.includes("women's clothing")}
                            onChange={() => handleCategoryChange("women's clothing")}
                            name="category" type="checkbox"
                            value="women's clothing" /> Women's Clothing
                    </label>
                </div>

                <div className="flex text-sm flex-col">
                    <label className="font-medium mb-1" htmlFor="sort">Sort</label>
                    <select value={filters.sort} onChange={handleSortChange} className="border border-gray-300 rounded-lg px-2 py-2" id="sort" name="sort">
                        <option value=''>All</option>
                        <option value='price_aesc'>Low to High</option>
                        <option value='price_desc'>High to Low</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    updatedProduct.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))
                }
            </div>
        </Container>
    )
}

export default Products


