import type { AddToCart } from "../../types/product"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/AppContext"
import { motion } from 'motion/react'
import { Minus, Plus } from "lucide-react"
import { cardVariants } from "../../pages/Cart"

interface CartItemCardProps {
    product: AddToCart
}

const CartItemCard = ({ product }: CartItemCardProps) => {
    const navigate = useNavigate()

    const { removeFromCart, editQuantity } = useAppContext()

    const { image, price, quantity, title } = product

    const truncatedTitle = title ? (title.length > 35
        ? title?.slice(0, 35) + '...'
        : title) : null

    return (
        <motion.div
            variants={cardVariants}
            className="flex flex-col lg:flex-row p-4 gap-6 shadow-md hover:shadow-lg rounded-lg bg-white justify-center items-center w-full lg:min-w-2xl lg:w-2xl">

            <div
                className="gap-3 lg:gap-6 flex justify-center items-center w-full">
                <img
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="h-24 w-24 rounded-lg cursor-pointer object-contain"
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                />
                <div className="flex flex-col items-start gap-2 flex-1">
                    <h3
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="font-medium text-base cursor-pointer hover:text-gray-700">
                        {truncatedTitle}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {quantity} (₹{price} each) = <span className="font-medium">₹{price && (price * quantity).toFixed(2)}</span>
                    </p>

                    <p className="text-green-800 bg-green-100 rounded-full px-3 py-1 text-xs border border-green-300">In Stock</p>
                </div>
            </div>

            <div className="flex justify-between items-center w-full lg:w-auto gap-3 lg:gap-6">

                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => editQuantity(product.id, quantity - 1)}
                        disabled={quantity <= 1}>
                        <Minus
                            className="bg-gray-300 rounded-sm p-1 cursor-pointer hover:bg-gray-400" />
                    </button>
                    <p className="text-lg"
                    >{quantity}
                    </p>
                    <button
                        onClick={() => editQuantity(product.id, quantity + 1)}>
                        <Plus
                            className="bg-gray-300 rounded-sm p-1 cursor-pointer hover:bg-gray-400" />
                    </button>
                </div>

                <button
                    aria-label="deleteItem"
                    className="px-3 py-1.5 text-white cursor-pointer hover:bg-red-500 rounded-md bg-red-600"
                    onClick={() => removeFromCart(product.id)}
                >
                    Remove
                </button>
            </div>
        </motion.div>
    )
}

export default CartItemCard


