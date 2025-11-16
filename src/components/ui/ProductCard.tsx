import { FaStar } from "react-icons/fa6"
import type { Product } from "../../types/product"
import Button from "./Button"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../../context/AppContext"

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { image, category, title, price, rating } = product
    const navigate = useNavigate()
    const context = useContext(AppContext)
    if (!context)
        throw new Error('Context Error.')

    const { addToCart, quantity } = context

    const handleAddToCart = () => {
        const finalProduct = {
            id: product.id,
            image,
            title,
            price,
            quantity
        }
        addToCart(finalProduct)
    }

    const newTitle = title.length > 35 ? title.slice(0, 35) + '...' : title
    return (
        <div className="w-70 gap-3 shadow-lg rounded-lg flex flex-col justify-center items-center p-4 transition-all duration-300 transform hover:-translate-y-2 h-120 bg-white product-card">
            <div className="h-52 w-full flex justify-center items-center">
                <img
                    className="h-full cursor-pointer w-auto object-contain"
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    onClick={() => navigate(`/product/${product.id}`)}
                />
            </div>

            <p className="w-full text-gray-500 text-sm">{category.toUpperCase()}</p>

            <h3
                onClick={() => navigate(`/product/${product.id}`)}
                className="w-full cursor-pointer font-medium">
                {newTitle}
            </h3>

            <div className="w-full">
                <p className="flex items-center gap-1"><span className="text-yellow-300"><FaStar aria-hidden='true' /></span>{rating.rate} ({rating.count})</p>
            </div>

            <div className="w-full flex justify-between items-center">
                <p className="font-medium text-lg">₹{price}</p>
                <p className="text-green-600 bg-green-100 rounded-full flex justify-center items-center px-2 py-[.1rem] text-sm">In Stock</p>
            </div>

            <div className="w-full pt-3 items-center flex justify-end">
                <Button
                    type="button"
                    text='Add to Cart'
                    onClick={handleAddToCart}
                />
            </div>
        </div>
    )
}

export default ProductCard


