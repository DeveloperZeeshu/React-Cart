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
                        className="flex justify-center bg-white rounded-lg shadow-md hover:shadow-lg p-5 lg:w-100">
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
                        initial='hidden'
                        animate='show'
                        className="flex flex-col gap-5 p-6 bg-white rounded-lg shadow-md hover:shadow-lg max-w-150 lg:min-w-150">
                        <div>
                            <span
                                className="text-blue-600 px-3 py-2 rounded-md text-sm bg-blue-100 font-semibold">
                                {product?.category}
                            </span>
                        </div>

                        <span className="font-medium text-2xl">
                            {product?.title}
                        </span>

                        <div className="w-full">
                            <p className="flex items-center text-sm gap-1">
                                ⭐⭐⭐⭐
                                <span
                                    className="font-semibold text-lg">{product?.rating?.rate}</span>
                                ({product?.rating?.count} reviews)
                            </p>
                        </div>

                        <div className="w-full flex flex-col rounded-lg bg-gray-100 p-3 gap-3 border border-gray-300">
                            <div className="flex gap-6">
                                <p className="font-bold text-2xl text-blue-600">
                                    ₹{product?.price}
                                    <span className="text-sm font-semibold text-gray-700 line-through"> ₹{product?.price && (product?.price + product?.price * 10 / 100).toFixed(2)}</span>
                                </p>
                                <span
                                    className="bg-green-100 border text-sm border-green-300 rounded-md text-green-600 px-2 py-1 font-semibold">
                                    10% OFF
                                </span>
                            </div>
                            <span className="text-gray-500">Inclusive of all taxes</span>
                        </div>
                        <div>
                            <span className="text-lg font-semibold">
                                Description
                            </span>
                            <p className="leading-relaxed mt-2 overflow-hidden">{truncatedDesc}
                                <span
                                    onClick={() => setIsDescHidden(prev => !prev)}
                                    className="font-semibold cursor-pointer">
                                    {isDescHidden ? 'more' : '...less'}
                                </span></p>
                        </div>
                        <div className="flex flex-col bg-green-100 rounded-md text-green-600 px-3 py-1 border border-green-300">
                            <span
                                className="font-semibold">
                                In Stock
                            </span>
                            <span className="text-sm">
                                Free Delivery
                            </span>

                        </div>
                        <div className="w-full pt-3 items-center flex gap-4 mt-4">
                            <button
                                id="add-to-cart"
                                data-testid='add-to-cart'
                                className="text-white rounded-full h-12 w-32 lg:h-16 lg:w-50 bg-blue-600 text-lg hover:bg-blue-500 cursor-pointer"
                                onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                            <button
                                className="text-blue-600 border-2 h-12 w-32 lg:h-16 lg:w-50 border-blue-600 text-lg rounded-full hover:bg-gray-50 cursor-pointer">
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


