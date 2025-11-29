import type { Product } from "../../types/product"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { motion } from 'motion/react'
import { AppContext } from "../../context/AppContext"
import { fromLeftVariants } from "../../pages/Home"

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { image, title, price } = product
    const navigate = useNavigate()
    const context = useContext(AppContext)
    if (!context)
        throw new Error('Context Error.')

    const newTitle = title.length > 35 ? title.slice(0, 35) + '...' : title
    return (
        <motion.div
            key={product.id}
            variants={fromLeftVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}

            className="max-w-70 gap-3 shadow-lg hover:shadow-xl rounded-lg flex flex-col justify-center items-center pb-4 transition-all duration-300 transform hover:-translate-y-.9 h-auto bg-white product-card cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}>

            <div className="h-full w-full bg-gray-50 flex justify-center items-center">
                <motion.img
                    className="h-64 hover:scale-105 transition-all duration-300 p-4 w-auto object-contain px-4"
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                />
            </div>

            <h3
                className="w-full text-[1rem] px-4">
                {newTitle}
            </h3>

            <div className="w-full flex justify-between items-center px-4">
                <p className="font-medium text-lg">₹{price} <span
                    className="text-sm text-gray-500 line-through font-semibold">{(price + price * 10 / 100).toFixed(2)}</span></p>
                <p className="text-green-600 bg-green-100 rounded-full flex justify-center items-center px-2 py-[.1rem] text-sm">In Stock</p>
            </div>
        </motion.div>
    )
}

export default ProductCard


