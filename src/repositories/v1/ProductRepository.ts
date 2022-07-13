import { IProduct } from "../../interfaces/v1/IProduct"
import Product from "../../model/v1/Product"

export default class ProductRepository {
    public async createProduct(name: string, price: number, category: string, amount_stored?: number, photo?:string): Promise<IProduct> {
        const prod = await Product.create({name, price, category, amount_stored, photo})
        await prod.save()
        return prod
    }
    public async getProducts(): Promise<IProduct[]> {
        const prods = await Product.find({})
        return prods
    }
    public async findProduct(id: string): Promise<IProduct | null> {
        const prod = await Product.findById(id)
        return prod
    }
    public async put(id: string, data: IProduct): Promise<IProduct | null> {
        const prod = await Product.findByIdAndUpdate(id, data)
        return prod
    }
    public async destroy(id: string): Promise<IProduct | null> {
        const prod = await Product.findByIdAndDelete(id)
        return prod
    }
}