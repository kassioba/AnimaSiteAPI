import { faker } from "@faker-js/faker";
import { prisma } from "config/database";

export function createProduct(){
    return prisma.product.create({
        data: {
            name: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            image: faker.image.dataUri({ type: "svg-uri" }),
            image_alt: faker.commerce.productName(),
            price: Number(faker.commerce.price()),
        }
    })
}