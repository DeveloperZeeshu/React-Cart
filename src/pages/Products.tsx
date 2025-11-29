import Container from "../components/container/Container"
import ProductCard from "../components/ui/ProductCard"
import { motion } from "motion/react"
import { useAppContext } from "../context/AppContext"
import { useEffect } from "react"
import FilterProducts from "../components/ui/FilterProducts"

const Products = () => {
    const { loading, updatedProducts, products, fetchAllProducts } = useAppContext()

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
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-8 justify-center items-start">
                {<FilterProducts />}

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        updatedProducts?.map(product => (
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


