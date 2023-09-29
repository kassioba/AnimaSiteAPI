export type Payment = {
    cart: Cart[]
    customer: Customer
    shipping_price?: number
}

type Cart = {
    title: string
    unit_price: number
    quantity: number
}

type Customer = {
    name: string
    email: string
    adress: {
        zip_code: string
        street_name: string
    }
}