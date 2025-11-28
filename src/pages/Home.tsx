import { useEffect } from "react";
import Container from "../components/container/Container";
import ProductCard from "../components/ui/ProductCard";
import { useAppContext } from "../context/AppContext";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { motion, type Variants } from "motion/react";
import { Search } from "lucide-react";

export const gridVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
}

export const fromLeftVariants: Variants = {
    hidden: {
        opacity: 0,
        transform: "translateX(-60px)",
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
        transform: 'translateX(60px)'
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
    const navigate = useNavigate()

    const { products, fetchAllProducts, loading } = useAppContext()

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
            <h1 className="text-3xl font-bold">Discover the Best Deals</h1>
            <p className="text-gray-600 mb-10">Find the best products at amazing prices.</p>

            <motion.form
                variants={fromRightVariants}
                initial='hidden'
                animate='show'
                className="flex gap-4 w-full max-w-xl mb-12">
                <Input
                    type="search"
                    className="w-full shadow-lg"
                    placeholder="Search for product e.g., men's t'shirt"
                />
                <button
                    type="submit"
                    aria-label="search"
                    className="text-2xl px-3 rounded-lg cursor-pointer hover:bg-blue-500 bg-blue-600 text-white shadow-lg"
                >
                    <Search size={19}/>
                </button>
            </motion.form>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {
                    products?.slice(0, 4).map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))
                }
            </motion.div>

            <div className="flex justify-center">
                <Button
                    type="button"
                    text="Browse All Products..."
                    onClick={() => navigate('/products')}
                />
            </div>
        </Container>
    )
}

export default Home


