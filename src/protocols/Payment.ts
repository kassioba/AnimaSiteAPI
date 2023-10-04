export type Payment = {
    cart: Cart[]
    customer: Customer
    address: Address
    card: Card
    shipping?: Omit<Cart, "quantity">
}

export type Cart = {
    name: string
    unit_amount: number
    quantity: number
}

type Customer = {
    name: string
    email: string
    tax_id: string
}

type Address = {
        street: string
        number: string
        complement: string
        locality: string
        city: string
        region_code: string
        country: string
        postal_code: string
}

type Card = {
    number: string
    exp_month: number
    exp_year: number
    security_code: string
    holder: {
        name: string
    }
}