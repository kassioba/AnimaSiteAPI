import { Cart } from "../protocols/Payment";
import { notFoundError } from "../errors/notFound.error";
import { findStockById, findStockByProductId, findStocksById, updateStockQuantity } from "../repositories/stock.repository";
import { Stock } from "@prisma/client";

export async function getStockByProductId(productId: number) {
    const stock = await findStockByProductId(productId)
    
    if(!stock[0]) throw notFoundError("Stock not found!")

    return stock
}

export async function checkStock(cart: Cart[]){
    const outOfStockErrors: string[] = [];
    const notEnoughErrors: string[] = [];

    for (const item of cart) {
        const check = await findStockById(item.stock_id)

        if(!check.quantity) outOfStockErrors.push(item.name)
        else if(check.quantity - item.quantity < 0) notEnoughErrors.push(item.name)
    };

    if(outOfStockErrors.length && notEnoughErrors.length) 
        return `Product(s) ${outOfStockErrors.join(', ')} out of stock. Not enough ${notEnoughErrors.join(', ')} in stock.`
    else if(outOfStockErrors.length) 
        return `Product(s) ${outOfStockErrors.join(', ')} out of stock`
    else if (notEnoughErrors.length)
        return `Not enough ${notEnoughErrors.join(', ')} in stock.`
}

type UpdateStock = Omit<Stock, "product_id" | "size" | "createdAt" | "updatedAt" >

export async function updateStock(cart: Cart[]) {
    const stocksHash = {}

    const stocks = await findStocksById(cart.map(item => item.stock_id))

    stocks.forEach(stock => stocksHash[stock.id] = stock.quantity);

    cart.forEach(async item => {
        const updateQuantity = stocksHash[item.stock_id] - item.quantity

        await updateStockQuantity(item.stock_id, updateQuantity)
    })
}