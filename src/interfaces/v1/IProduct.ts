import {ObjectId} from 'mongoose'

export interface IProduct {
    id?: ObjectId | undefined,
    name: string,
    price: number,
    category: string,
    amount_stored: number,
    photo?: string
}