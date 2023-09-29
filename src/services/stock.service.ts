import { db } from "../app";
import { notFoundError } from "../errors/notFoundError";
import { findStockByProductId } from "../repositories/stock.repository";

export async function getStockByProductId(productId: number) {
    const stock = await findStockByProductId(productId)
    
    if(!stock[0]) throw notFoundError("Stock not found!")

    return stock
    
    // let quantidade = 0;
    //     let tamanhos = [];
    //     let estoquePorTamanho = [];
      
    //     const itens = await db.collection("estoque").find({ nome: "CAMISETA ÂNIMA" }).toArray();

        
      
    //     for (let i = 0; i < itens.length; i++) {
    //       quantidade += itens[i].estoque;
    //       if (itens[i].estoque > 0) {
    //         tamanhos.push(itens[i].tamanho);
    //       }
    //       estoquePorTamanho.push({
    //         tamanho: itens[i].tamanho,
    //         estoque: itens[i].estoque,
    //       });
    //     }
      
    //     if (!tamanhos[0]) {
    //       // tamanhos = "Tamanho único";
    //     }
      
    //     console.log(stock);
    //     console.log(itens)
      
    //     return {
    //       nome: "CAMISETA ÂNIMA",
    //       estoque: quantidade,
    //       estoquePorTamanho,
    //       tamanhosDisponiveis: tamanhos,
    //     };
}