import * as jwt from 'jsonwebtoken'

let secret = ""
if(process.env.JWT_TOKEN) {
    secret = process.env.JWT_TOKEN
} else {
    secret = "DK1JK23J1KFSAKDJ1KJ4EK1L2J3K1L2J31LK2"
}

const expiresIn = 60 * 60 * 24* 7
    
export const sign = (payload: string | object | Buffer) => jwt.sign(payload, secret, {expiresIn})
export const decode = (token: string) => jwt.verify(token, secret)