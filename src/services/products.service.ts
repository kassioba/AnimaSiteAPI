import { notFoundError } from "../errors/notFoundError";
import { findProductById, findProducts } from "../repositories/products.reposity";

export async function getAllProducts() {
    const products = await findProducts()

    return products
}

export async function getProductById(productId: number) {
    const product = await findProductById(productId)

    if(!product) throw notFoundError("Product not found!")

    return product
}