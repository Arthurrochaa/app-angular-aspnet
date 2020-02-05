import { Category } from "../models/category.model";

export class Product {
    productID: number
    name: string
    description: string
    price: number
    category: Category

    constructor() {}
}
