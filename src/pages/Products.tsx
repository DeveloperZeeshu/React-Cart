import Container from "../components/container/Container"
import ProductCard from "../components/ui/ProductCard"
import { motion, type Variants } from "motion/react"
import { useAppContext } from "../context/AppContext"
import { useEffect } from "react"

export const filterVariant: Variants = {
    hidden: {
        opacity: 0,
        transform: 'translateX(-60px)'
    },
    show: {
        opacity: 1,
        transform: 'translateX(0px)',
        transition: {
            duration: 1
        }
    }
}

const Products = () => {
    const { loading, products, fetchAllProducts } = useAppContext()

    const categoryItems = [
        {
            label: 'All Categories',
            slug: ''
        },
        {
            label: 'Jewelery',
            slug: 'jewelery'
        },
        {
            label: 'Electronics',
            slug: 'electronics'
        },
        {
            label: "Men's Clothing",
            slug: "men's clothing"
        },
        {
            label: "Women's Clothing",
            slug: "women's clothing"
        }
    ]

    useEffect(() => {
        if (!products || products.length === 0)
            fetchAllProducts()
    }, [fetchAllProducts])

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
            {/* <form className="flex gap-4 w-full max-w-xl mb-12">
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
            </form> */}
            <div className="flex gap-8 justify-center items-start">
                <motion.div
                    variants={filterVariant}
                    initial='hidden'
                    animate='show'
                    className="hidden md:hidden lg:flex flex-col gap-5 rounded-lg h-auto min-w-75">
                    <div className=" flex flex-col bg-white rounded-lg shadow-lg p-5 gap-2">
                        <span className="font-medium pb-2 text-xl">Filter by Category</span>
                        {
                            categoryItems.map(item => (
                                <div className="flex justify-between items-center">
                                    <label
                                        htmlFor={item.label}
                                        className="">
                                        {item.label}
                                    </label>
                                    <input
                                        id={item.label}
                                        className="h-5 w-5"
                                        name="category"
                                        type="checkbox"
                                        value={item.slug}
                                    />
                                </div>
                            ))
                        }
                    </div>

                    <div className="flex flex-col p-5 rounded-lg bg-white shadow-lg">
                        <label className="font-medium mb-2 text-xl" htmlFor="sort">Sort by Price</label>
                        <select
                            className="border border-gray-300 rounded-lg px-2 py-2" id="sort" name="sort">
                            <option value=''>All</option>
                            <option value='price_aesc'>Low to High</option>
                            <option value='price_desc'>High to Low</option>
                        </select>
                    </div>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        products?.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))
                    }
                </motion.div>
            </div>
        </Container >
    )
}

export default Products


