import { useNavigate, useParams } from "react-router-dom"
import Container from "../components/container/Container"
import { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext"
import { motion } from 'motion/react'
import { fromLeftVariants, fromRightVariants } from "./Home"
import { ArrowLeft } from "lucide-react"

const ProductInDetail = () => {
    let { id } = useParams()
    const navigate = useNavigate()

    const [isDescHidden, setIsDescHidden] = useState<boolean>(true)
    const { product, productLoading, fetchProductById, addToCart } = useAppContext()

    let truncatedDesc = isDescHidden ? product?.description.slice(0, 65) + '...' : product?.description

    const handleAddToCart = () => {
        const cartItemInfo = {
            id: Number(id),
            title: product?.title,
            image: product?.image,
            price: product?.price,
            quantity: 1
        }
        addToCart(cartItemInfo)
    }

    useEffect(() => {
        fetchProductById(Number(id))
    }, [fetchProductById])

    if (productLoading) {
        return (
            <Container>
                <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            </Container>
        )
    }

    if (!product && !productLoading)
        return <p>Product not found.</p>

    return (
        <Container>
            <div>
                <motion.button
                    onClick={() => navigate('/')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="flex items-center text-blue-600 mb-2 cursor-pointer">
                    <ArrowLeft size={19} />
                    <span>
                        Go to Home
                    </span>
                </motion.button>
                <div className="flex flex-col justify-center lg:flex-row gap-6">
                    <motion.div
                        variants={fromLeftVariants}
                        initial='hidden'
                        animate='show'
                        className="flex justify-center bg-white rounded-lg shadow-lg p-5 lg:w-100">
                        <img
                            className="h-auto max-h-90 w-auto object-contain hover:scale-110 transition-all duration-300"
                            src={product?.image}
                            alt={product?.title}
                            loading="lazy"
                            decoding="async"
                        />
                    </motion.div>
                    <motion.div
                        variants={fromRightVariants}
                        initial="hidden"
                        animate="show"
                        className="bg-white rounded-lg shadow-lg p-6 max-w-xl mx-auto flex flex-col gap-6"
                    >

                        <div className="flex justify-between items-center">
                            <span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-sm font-semibold text-sm">
                                {product?.category}
                            </span>
                            <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                                <span>⭐ {product?.rating?.rate}</span>
                                <span className="text-gray-400 text-sm">({product?.rating?.count})</span>
                            </div>
                        </div>

                        <h1 className="text-xl font-bold text-gray-900">{product?.title}</h1>

                        <div className="flex items-center gap-4">
                            <p className="text-2xl font-bold text-blue-600">₹{product?.price.toFixed(2)}</p>
                            <p className="text-gray-400 line-through">₹{product?.price && (product?.price + product?.price * 0.1).toFixed(2)}</p>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md font-semibold text-sm">
                                10% OFF
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm">Inclusive of all taxes</p>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h2 className="font-semibold text-lg text-gray-700 mb-2">Description</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {truncatedDesc}
                                <span
                                    onClick={() => setIsDescHidden(prev => !prev)}
                                    className="ml-1 font-semibold text-blue-600 cursor-pointer"
                                >
                                    {isDescHidden ? "more" : "less"}
                                </span>
                            </p>
                        </div>

                        <div className="flex justify-between items-center bg-green-50 border border-green-200 rounded-lg p-3">
                            <span className="font-semibold text-green-700">In Stock</span>
                            <span className="text-sm text-green-600">Free Delivery</span>
                        </div>

                        <div className="flex gap-4 mt-4 flex-wrap">
                            <button
                                id="add-to-cart"
                                data-testid="add-to-cart"
                                className="text-white rounded-full h-12 w-32 lg:h-16 lg:w-50 bg-blue-600 text-lg hover:bg-blue-500 cursor-pointer"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                            <button className="text-blue-600 border-2 h-12 w-32 lg:h-16 lg:w-50 border-blue-600 text-lg rounded-full hover:bg-gray-50 cursor-pointer">
                                Buy Now
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </Container>
    )
}

export default ProductInDetail


