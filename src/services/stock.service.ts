import { Cart } from "../protocols/Payment";
import { notFoundError } from "../errors/notFound.error";
import { findStockById, findStockByProductId, findStocksById, updateStockQuantity } from "../repositories/stock.repository";

export async function getStockByProductId(product_id: number) {
    const stock = await findStockByProductId(product_id)

    if(!stock[0]) throw notFoundError("Stock not found!")

    return stock
}

export async function checkStock(cart: Cart[]){
    const outOfStockErrors: string[] = [];
    const notEnoughErrors: string[] = [];
    const DoNotExistError: number[] = [];

    for (const item of cart) {
        const check = await findStockById(item.stock_id)

        if(!check) {
            DoNotExistError.push(item.stock_id)
            continue
        }
        else if(!check.quantity) outOfStockErrors.push(item.name)
        else if(check.quantity - item.quantity < 0) notEnoughErrors.push(item.name)
    };

    if(DoNotExistError.length)
        return `stock_id ${DoNotExistError.join(', ')} do not exist`
    else if(outOfStockErrors.length && notEnoughErrors.length) 
        return `Product(s) ${outOfStockErrors.join(', ')} out of stock. Not enough ${notEnoughErrors.join(', ')} in stock.`
    else if(outOfStockErrors.length) 
        return `Product(s) ${outOfStockErrors.join(', ')} out of stock`
    else if (notEnoughErrors.length)
        return `Not enough ${notEnoughErrors.join(', ')} in stock.`
}

export async function updateStock(cart: Cart[]) {
    const stocksHash = {}

    const stocks = await findStocksById(cart.map(item => item.stock_id))

    stocks.forEach(stock => stocksHash[stock.id] = stock.quantity);

    cart.forEach(async item => {
        const updateQuantity = stocksHash[item.stock_id] - item.quantity

        await updateStockQuantity(item.stock_id, updateQuantity)
    })
}