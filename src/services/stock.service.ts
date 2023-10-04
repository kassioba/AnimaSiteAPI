import { notFoundError } from "../errors/notFound.error";
import { findStockByProductId } from "../repositories/stock.repository";

export async function getStockByProductId(productId: number) {
    const stock = await findStockByProductId(productId)
    
    if(!stock[0]) throw notFoundError("Stock not found!")

    return stock
}