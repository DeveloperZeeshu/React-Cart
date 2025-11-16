import { useParams } from "react-router-dom"
import Container from "../components/container/Container"
import { useCallback, useContext, useEffect, useState } from "react"
import type { Product } from "../types/product"
import { FaStar } from "react-icons/fa6"
import Button from "../components/ui/Button"
import { AppContext } from "../context/AppContext"

const ProductInDetail = () => {
    const { id } = useParams()
    const [product, setProduct] = useState<Product>()
    const [loading, setLoading] = useState(true)

    const context = useContext(AppContext)
    if (!context)
        throw new Error('Context Error.')

    const { addToCart, quantity, setQuantity } = context

    const handleAddToCart = () => {
        if (!product) return

        const finalProduct = {
            id: product?.id,
            image: product?.image,
            title: product?.title,
            price: product?.price,
            quantity
        }
        addToCart(finalProduct)
    }

    const fetchProduct = useCallback(async () => {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`)
            const data: Product = await res.json()
            setProduct(data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        fetchProduct()
    }, [fetchProduct])

    useEffect(() => {
        setQuantity(1)
    }, [id])

    if (loading) {
        return (
            <Container>
                <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            </Container>
        )
    }

    if (!product && !loading)
        return <p>Product not found</p>

    return (
        <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-lg shadow-lg">
                <div className="flex justify-center p-6">
                    <img
                        className="h-auto max-h-90 w-auto object-contain"
                        src={product?.image}
                        alt={product?.title}
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="flex flex-col gap-5 p-6">
                    <p className="w-full text-gray-500 text-sm">{product?.category.toUpperCase()}</p>

                    <h3 className="font-medium text-xl">{product?.title}</h3>

                    <div className="w-full">
                        <p className="flex items-center gap-1"><span className="text-yellow-300"><FaStar /></span>{product?.rating?.rate} ({product?.rating?.count})</p>
                    </div>

                    <div className="w-full flex justify-between items-center">
                        <p className="font-semibold text-lg">₹{product?.price}</p>
                        <p className="text-green-600 bg-green-100 rounded-full flex justify-center items-center px-2 py-[.1rem] text-sm">In Stock</p>
                    </div>
                    <p className="leading-relaxed">{product?.description}</p>
                    <div className="w-full pt-3 items-center flex gap-4 justify-end mt-8">
                        <Button
                            type="button"
                            text='Add to Cart'
                            onClick={handleAddToCart}
                        />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ProductInDetail

