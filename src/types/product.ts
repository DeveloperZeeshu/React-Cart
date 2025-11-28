
export interface Rating{
    rate: number
    count: number
}

export interface Product {
    id: number
    title: string
    image: string
    price: number
    rating: Rating
    category: string
    description: string
}

export interface AddToCart {
    id: number
    title?: string
    image?: string
    price?: number
    quantity: number
}

