import { createBrowserRouter } from "react-router-dom";
import AppProvider from './context/AppContext'
import App from "./App";
import { lazy, Suspense } from "react";
import Container from "./components/container/Container";

const Home = lazy(() => import('./pages/Home'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'))
const Products = lazy(() => import('./pages/Products'))
const ProductInDetail = lazy(() => import('./pages/ProductInDetail'))
const About = lazy(() => import('./pages/About'))
const Cart = lazy(() => import('./pages/Cart'))

export const router = createBrowserRouter([
    {
        path: '/',

        element: (
            <AppProvider>
                <App />
            </AppProvider>
        ),
        errorElement: (
            <Suspense fallback={
                <Container>
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                </Container>}>
                <ErrorPage />
            </Suspense>
        ),
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={
                        <Container>
                            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                        </Container>}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: 'products',
                element: (
                    <Suspense fallback={
                        <Container>
                            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                        </Container>}>
                        <Products />
                    </Suspense>
                )
            },
            {
                path: 'product/:id',
                element: (
                    <Suspense fallback={
                        <Container>
                            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                        </Container>}>
                        <ProductInDetail />
                    </Suspense>
                )
            },
            {
                path: 'about',
                element: (
                    <Suspense fallback={
                        <Container>
                            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                        </Container>}>
                        <About />
                    </Suspense>
                )
            },
            {
                path: 'cart',
                element: (
                    <Suspense>
                        <Cart />
                    </Suspense>
                )
            }
        ]
    }
])

