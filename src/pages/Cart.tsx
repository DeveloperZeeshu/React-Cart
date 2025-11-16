import Container from "../components/container/Container"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import CartItemCard from "../components/ui/CartItemCard"
import Button from "../components/ui/Button"
import { useNavigate } from "react-router-dom"
import CartTotal from "../components/ui/CartTotal"

const Cart = () => {
    const navigate = useNavigate()
    const context = useContext(AppContext)
    const [cartTotal, setCartTotal] = useState<number>(0)
    if (!context)
        throw new Error('Context Error.')

    const { cartItems } = context

    useEffect(() => {
        let total = 0
        cartItems.forEach(item =>
            total += item.price * item.quantity
        )
        setCartTotal(total)
    }, [cartItems])

    if (cartItems.length == 0) {
        return (
            <Container>
                <div className="flex flex-col gap-4 items-center">
                    <img
                        src="/empty-cart.png"
                        loading="lazy"
                        className="h-70 w-70"
                        decoding="async"
                    />
                    <h3 className="text-2xl font-medium">Your Cart is Empty!</h3>
                    <p className="text-gray-500 mt-2 mb-6">
                        Looks like you haven't added anything yet.
                    </p>
                    <Button
                        type="button"
                        text="Shop Now"
                        onClick={() => navigate('/products')}
                    />
                </div>
            </Container>
        )
    }

    return (
        <Container>
            <div className="">
                <h2 className="text-2xl font-medium mb-4">Cart Items({cartItems.length})</h2>
                <div className="flex flex-col lg:flex-row w-full justify-between items-center lg:items-start gap-5">
                    <div className="flex flex-col gap-4">
                        {
                            cartItems?.map(item => (
                                <CartItemCard
                                    key={item.id}
                                    product={item}
                                />
                            ))
                        }
                    </div>
                    <CartTotal
                        cartTotal={cartTotal}
                        platformFee={17}
                    />
                </div>
            </div>
        </Container>
    )
}

export default Cart




