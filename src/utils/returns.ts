import { IProduct } from "../interfaces/v1/IProduct"
import { IUser } from "../interfaces/v1/IUser"
import { ProductReturn, UserReturn } from "../interfaces/v1/returns"

export const productSuccessReturn = (product: IProduct): ProductReturn => {
    const data = {
        type: "product",
        id: product.id,
        attributes: {
            name: product.name,
            price: product.price,
            category: product.category,
            amount_stored: product.amount_stored,
            photo: product.photo
        },
        links: {
            self: "/api/v1/products/" + product.id
        }
    }
    return data
}

export const userSuccessReturn = (user: IUser): UserReturn => {
    const data = {
        type: "user",
        id: user.id,
        attributes: {
            user: {
                name: user.name,
                email: user.email,
                photo: user.photo,
                document: user.document,
                gender: user.gender,
                phone: user.phone,
            },
            userAddress: {
                zipcode: user.zipcode,
                street: user.street,
                city: user.city,
                country: user.country,
                state: user.state,
                addressNumber: user.addressNumber
            }
        },
        links: {
            self: "/api/v1/user/" + user.id
        }
    }
    return data
}

export const userSuccessReturnToken = (user: IUser, token: string): UserReturn => {
    const data = {
        type: "user",
        id: user.id,
        attributes: {
            user: {
                name: user.name,
                email: user.email,
                photo: user.photo,
                document: user.document,
                gender: user.gender,
                phone: user.phone,
            },
            userAddress: {
                zipcode: user.zipcode,
                street: user.street,
                city: user.city,
                country: user.country,
                state: user.state,
                addressNumber: user.addressNumber
            }
        },
        links: {
            self: "/api/v1/user/" + user.id
        },
        token
    }
    return data
}