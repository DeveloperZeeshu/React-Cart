import Button from "./Button"
import Input from "./Input"
import { motion } from 'motion/react'

interface CartTotalProps {
    cartTotal: number
    platformFee?: number
}

const CartTotal = ({ cartTotal, platformFee = 17 }: CartTotalProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.6,
                ease: 'easeOut'
            }}
            className="shadow-md hover:shadow-lg rounded-lg p-5 h-auto flex flex-col gap-6 max-w-md lg:min-w-md bg-white">

            <h3 className="text-xl font-medium">Cart Total</h3>
            <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-600">Enter Promo Code</p>
                <div className="flex gap-3 w-full">
                    <Input
                        w='w-full'
                        type="text"
                        className="w-full rounded-lg"
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