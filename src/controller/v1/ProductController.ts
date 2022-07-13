/*
 * to-do:
 *
 * - adicionar YUP (validações)
 * - alterar o response do destroy
 */

import { Request, Response, NextFunction } from "express";
import { IProduct } from "../../interfaces/v1/IProduct";

import ProductRepository from '../../repositories/v1/ProductRepository'
import { errCreateProduct, errDeleteProduct, errGetProducts, errProductsNotFound, errUpdateProduct } from "../../utils/errors";
import { productSuccessReturn } from "../../utils/returns";

import { create } from "../../schemas/v1/ProductSchema";

const Product = new ProductRepository()
const {createProduct, getProducts, findProduct, put, destroy} = Product


export default class ProductController {
    public async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { name, price, category, amount_stored, photo }: IProduct = req.body;
        const data:IProduct = {name, price, category, amount_stored, photo}
        try {
            const product = await createProduct(name, price, category, amount_stored, photo)

            if(!(await create.isValid(data))) {
                return res.status(400).json({error: "Error on validate product schema."})
            }
            
            return res.status(200).json({ data: productSuccessReturn(product) })
        } catch (error) {
            console.error(error)
            return res.status(errCreateProduct.status).json({ errors: [errCreateProduct] })
        }
    }

    public async get(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const products = await getProducts()
            if (products.length == 0) return res.status(errProductsNotFound.status).json({ errors: [errProductsNotFound] })
            return res.status(200).json({ data: products.map(productSuccessReturn) })


        } catch (error) {
            return res.status(errGetProducts.status).json({ errors: [errGetProducts] })
        }
    }

    public async find(req: Request, res: Response, next:NextFunction): Promise<Response> {
        const { id } = req.params
        try {
            const product = await findProduct(id);
            if (product == null) return res.status(errProductsNotFound.status).json({ errors: [errProductsNotFound] })

            return res.status(200).json({ data: productSuccessReturn(product) })
        } catch (error) {
            console.log(error)
            return res.status(errGetProducts.status).json({ errors: [errGetProducts] })
        }
    }

    public async put(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id } = req.params
        const {name, price, category, amount_stored}: IProduct = req.body
        const data: IProduct = {name, price, category, amount_stored}

        try {
            const product = await put(id, data);
            if (product == null) return res.status(errProductsNotFound.status).json({ errors: [errProductsNotFound] })

            return res.status(200).json({ data: productSuccessReturn(product) })
        } catch (error) {
            return res.status(errUpdateProduct.status).json({ errors: [errUpdateProduct] })
        }
    }

    public async destroy(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id } = req.params
        
        try {
            const product = await destroy(id);
            if (product == null) return res.status(errProductsNotFound.status).json({ errors: [errProductsNotFound] })
            return res.status(200).json({ data: "Produto deletado com sucesso!" })
            
        } catch (error) {
            return res.status(errDeleteProduct.status).json({ errors: [errDeleteProduct] })
        }
    }
}