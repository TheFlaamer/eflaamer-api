import { ObjectId } from "mongoose";

export interface IUser {
    id?: ObjectId | undefined,
    name: string,
    email: string,
    password?: string | undefined,
    photo?: string | undefined,
    document?: string | undefined,
    gender?: string | undefined,
    phone?: string | undefined,
    zipcode?: string | undefined,
    street?: string | undefined,
    city?: string | undefined,
    country?: string | undefined,
    state?: string | undefined,
    addressNumber?: number | undefined
}