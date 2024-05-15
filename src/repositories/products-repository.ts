import {productType} from "../types/types";

const products: productType[] = [
    {id: 1, title: 'tomato'},
    {id: 2, title: 'orange'},
    {id: 3, title: 'tatata'},
]

export const productsRepository = {
    findProducts(title: string | null | undefined) {
        if (title) {
            return products.filter(p => p.title.indexOf(title) > -1)
        } else {
            return products
        }
    },
    findProductById(id: number) {
        return products.find(p => p.id === id)
    },
    createProduct(title: string) {
        const newProduct = {id: +(new Date()), title: title}
        products.push(newProduct)
        return newProduct
    }
}