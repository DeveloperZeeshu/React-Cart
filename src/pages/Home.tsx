import { useContext, useEffect } from "react";
import Container from "../components/container/Container";
import ProductCard from "../components/ui/ProductCard";
import { AppContext } from "../context/AppContext";
import Input from "../components/ui/Input";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const Home = () => {
    const navigate = useNavigate()
    const context = useContext(AppContext)
    if (!context)
        throw new Error('AppContext Error.')

    const { products, fetchProducts, loading } = context

    useEffect(() => {
        if (products.length == 0)
            fetchProducts()
    }, [])

    if (loading) {
        return (
            <Container>
                <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            </Container>
        )
    }

    if(!products && !loading)
        return <p>Products not found.</p>

    return (
        <Container>
            <h1 className="text-3xl font-bold">Discover the Best Deals</h1>
            <p className="text-gray-600 mb-10">Find the best products at amazing prices.</p>

            <form className="flex gap-4 w-full max-w-xl mb-12">
                <Input
                    type="search"
                    className="w-full shadow-lg"
                    placeholder="Search for product e.g., men's t'shirt"
                />
                <button
                    type="submit"
                    aria-label="search"
                    className="text-2xl px-3 rounded-lg bg-black text-white shadow-lg"
                >
                    <IoMdSearch aria-hidden='true' />
                </button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {
                    products?.slice(0, 4).map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))
                }
            </div>

            <div className="flex justify-center">
                <Button
                    type="button"
                    text="Browse All Products"
                    onClick={() => navigate('/products')}
                />
            </div>
        </Container>
    )
}

export default Home


