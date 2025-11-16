import Button from "./Button"
import Input from "./Input"

interface CartTotalProps {
    cartTotal: number
    platformFee?: number
}

const CartTotal = ({ cartTotal, platformFee = 17 }: CartTotalProps) => {
    return (
        <div className="border border-gray-400 rounded-lg p-5 h-auto flex flex-col gap-6 max-w-md lg:min-w-md bg-white">

            <h3 className="text-xl font-medium">Cart Total</h3>
            <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-600">Enter Promo Code</p>
                <div className="flex gap-3">
                    <Input
                        type="text"
                        className="w-full"
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
        </div>
    )
}

export default CartTotal