import Container from "../components/container/Container"
import { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext"
import CartItemCard from "../components/ui/CartItemCard"
import Button from "../components/ui/Button"
import { useNavigate } from "react-router-dom"
import CartTotal from "../components/ui/CartTotal"
import { motion, type Variants } from 'motion/react'

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: -40 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: "easeOut",
        },
    },
};


const Cart = () => {
    const navigate = useNavigate()
    const [cartTotal, setCartTotal] = useState<number>(0)

    const { cartItems } = useAppContext()

    useEffect(() => {
        let total = cartItems.reduce((accum, item) => {
            const price = item.price ?? 0
            const qty = item.quantity ?? 0
            return accum + (price * qty)
        }, 0)
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
                    <p className="text-gray-500 text-center mt-2 mb-6">
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
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col gap-4">
                        {
                            cartItems?.map(item => (
                                <motion.div
                                    key={item.id}
                                    variants={cardVariants}>
                                    <CartItemCard
                                        product={item}
                                    />
                                </motion.div>
                            ))
                        }
                    </motion.div>
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




