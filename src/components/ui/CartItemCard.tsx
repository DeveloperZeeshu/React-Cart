import { MdDelete } from "react-icons/md"
import Input from "./Input"
import type { AddToCart } from "../../types/product"
import { useNavigate } from "react-router-dom"
import { useContext, useState, type ChangeEvent } from "react"
import { AppContext } from "../../context/AppContext"

interface CartItemCardProps {
    product: AddToCart
}

const CartItemCard = ({ product }: CartItemCardProps) => {
    const navigate = useNavigate()
    const context = useContext(AppContext)
    if (!context)
        throw new Error('Context Error.')

    const { removeFromCart, editQuantity } = context

    const { image, price, quantity: qty, title } = product

    const [quantity, setQuantity] = useState<number>(qty)

    const truncatedTitle = title.length > 35
        ? title.slice(0, 35) + '...'
        : title

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Number(e.target.value)

        setQuantity(newQuantity)

        editQuantity(product.id, newQuantity)
    }

    return (
        <div className="flex flex-col lg:flex-row p-4 items-center justify-between gap-6 border rounded-lg border-gray-400 w-full bg-white">
            <div className="flex gap-3 justify-between items-center lg:gap-6 w-full">
                <img
                    className="h-24 w-24 rounded-lg object-contain"
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                />
                <div className="flex flex-col items-start gap-3 flex-1">
                    <h3
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="font-medium text-base cursor-pointer hover:text-gray-700">
                        {truncatedTitle}
                    </h3>
                    <p className="text-green-800 bg-green-100 rounded-full px-3 py-0.5 text-xs">In Stock</p>
                </div>
            </div>

            <div className="flex justify-between items-center w-full lg:w-auto gap-3 lg:gap-6">
                <p className="text-base font-semibold whitespace-nowrap">
                    ₹{price}
                </p>

                <Input
                    type="number"
                    placeholder="Qty."
                    className="w-20"
                    w='w-auto'
                    value={quantity}
                    min={1}
                    onChange={handleQuantityChange}
                />

                <p className="font-semibold text-lg whitespace-nowrap">
                    ₹{price * qty}
                </p>
                <button
                    aria-label="deleteItem"
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-600 text-2xl hover:opacity-70">
                    <MdDelete aria-hidden='true' />
                </button>
            </div>
        </div>
    )
}

export default CartItemCard


