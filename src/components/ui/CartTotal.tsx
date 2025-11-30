import Button from "./Button"
import { motion } from 'motion/react'

interface CartTotalProps {
    cartTotal: number
    platformFee?: number
    totalItems: number
}

const CartTotal = ({ cartTotal, totalItems, platformFee = 17 }: CartTotalProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.6,
                ease: 'easeOut'
            }}
            className="shadow-md hover:shadow-lg rounded-lg p-5 h-auto flex flex-col gap-6 w-full lg:w-md bg-white">

            <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Cart Total</h3>
                <p className="font-semibold">({totalItems} Items)</p>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="promo" className="text-sm text-gray-600">Enter Promo Code</label>
                <div className="flex gap-3 w-full">
                    <input
                        id="promo"
                        type="text"
                        className="w-full rounded-lg border px-3 border-gray-400 focus:border-blue-600 focus:outline-none"
                        placeholder="Enter Promo Code"
                    />
                    <Button
                        type="button"
                        text="Apply"
                    />
                </div>
            </div>
            <div>
                <div className="flex justify-between">
                    <p className="text-gray-700">Subtotal</p>
                    <p className="font-medium">₹{cartTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-700">Shipping</p>
                    <p className="font-medium text-green-500">FREE</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-700">Platform fee</p>
                    <p className="font-medium">₹{platformFee}</p>
                </div>

                <hr className="my-3" />

                <div className="flex justify-between text-lg font-semibold">
                    <p>Total</p>
                    <p>₹{(platformFee + cartTotal).toFixed(2)}</p>
                </div>
            </div>
            <Button
                type="button"
                text="Proceed to Checkout"
            />
        </motion.div>
    )
}

export default CartTotal
