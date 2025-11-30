import type { Product } from "../../types/product"
import { useNavigate } from "react-router-dom"
import { motion } from 'motion/react'
import { fromLeftVariants } from "../../pages/Home"

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { image, title, price } = product
    const navigate = useNavigate()

    const newTitle = title.length > 35 ? title.slice(0, 35) + '...' : title
    return (
        <motion.div
            data-testid='product-card'
            variants={fromLeftVariants}
            className="gap-3 shadow-lg hover:shadow-xl rounded-lg flex flex-col justify-center items-center pb-4 h-full bg-white product-card cursor-pointer w-full"
            onClick={() => navigate(`/product/${product.id}`)}>

            <div className="h-full w-full rounded-t-lg bg-gray-50 flex justify-center items-center">
                <motion.img
                    className="h-64 w-84 hover:scale-105 transition-all duration-300 p-4  object-contain px-4"
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                />
            </div>

            <h3
                className="w-full font-semibold px-4">
                {newTitle}
            </h3>

            <div className="w-full flex justify-between items-center px-4">
                <p className="font-medium text-xl">₹{price} <span
                    className="text-sm text-gray-500 line-through font-semibold">{(price + price * 10 / 100).toFixed(2)}</span></p>
                <p className="text-green-600 bg-green-100 rounded-full flex justify-center items-center px-2 py-[.1rem] text-sm border border-green-300">In Stock</p>
            </div>
        </motion.div>
    )
}

export default ProductCard


