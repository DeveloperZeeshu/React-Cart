import { useEffect } from "react";
import Container from "../components/container/Container";
import ProductCard from "../components/ui/ProductCard";
import { useAppContext } from "../context/AppContext";
import { motion, type Variants } from "motion/react";
import FilterProducts from "../components/ui/FilterProducts";

export const fromLeftVariants: Variants = {
    hidden: {
        opacity: 0,
        transform: "translateX(-30px)",
    },
    show: {
        opacity: 1,
        transform: "translateX(0px)",
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export const fromRightVariants: Variants = {
    hidden: {
        opacity: 0,
        transform: 'translateX(30px)'
    },
    show: {
        opacity: 1,
        transform: 'translateX(0px)',
        transition: {
            duration: .5
        }
    }
}

const Home = () => {
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
            <div className="w-full flex justify-between items-end">
                <h1 className="text-2xl font-bold mb-3">Products</h1>
                <p className="mb-2 hidden lg:flex">Showing {updatedProducts.length} products</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-8 justify-center items-start">
                {<FilterProducts />}

                <div>
                    <p className="mb-2 lg:hidden">Showing {updatedProducts.length} products</p>
                    <motion.div
                        className="grid grid-cols-1 w-full lg:w-auto md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {
                            updatedProducts?.map(product => (
                                <motion.div
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.2 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="h-full"
                                    key={product.id}>
                                    <ProductCard
                                        product={product}
                                    />
                                </motion.div>
                            ))
                        }
                    </motion.div>
                </div>
            </div>
        </Container >
    )
}

export default Home


