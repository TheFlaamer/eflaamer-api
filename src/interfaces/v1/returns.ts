import { ObjectId } from "mongoose";
import { IProduct } from "./IProduct";

export interface ProductReturn {
    type: string,
    id: ObjectId | undefined,
    attributes: IProduct,
    links: {
        self: string
    }
}

export interface UserReturn {
    type: string,
    id: ObjectId | undefined,
    attributes: {
        user: {
            name: string,
            email: string,
            photo?: string | undefined,
            document?: string | undefined,
            gender?: string | undefined,
            phone?: string | undefined,
        },
        userAddress: {
            zipcode?: string | undefined,
            street?: string | undefined,
            city?: string | undefined,
            country?: string | undefined,
            state?: string | undefined,
            addressNumber?: number | undefined
        }
    },
    links: {
        self: string
    }
}