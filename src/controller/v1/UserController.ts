//validacao com yup
//erros
//sistema de login fazer dps pq depende do oauth tb
import multer from 'multer'
import multerConfig from '../../config/v1/multer'
const upload = multer(multerConfig)

import UserRepository from "../../repositories/v1/UserRepository"
import { Request, Response, NextFunction } from "express";
import { errCreateUser, errDeleteUser, errGetUser, errUpdateUser, errUserAlreadyExists, errUserNotFound } from "../../utils/errors";
import { userSuccessReturn, userSuccessReturnToken } from "../../utils/returns";
import { IUser } from "../../interfaces/v1/IUser";
import bcrypt from 'bcrypt'
import { GenerateAuthToken } from "./generateAuthToken";
import { register } from '../../schemas/v1/UserSchema'

const User = new UserRepository()
const { createUser, getUsers, findUser, put, destroy, verifyEmail } = User


// import UploadFilesController from '../../controller/v1/UploadFilesController'
// const uploadFilesController = new UploadFilesController()

// routes.post("/files", upload.single('image'), async(req,res)=>{
//     const { file } = req
//     if(file) {
//         await uploadFilesController.UploadImageService(file)
//         return res.send()
//     }
// })

// routes.delete("/files/:filename", async (req, res)=>{
//     const { filename } = req.params;

//     await uploadFilesController.DeleteImageService(filename)

//     return response.send();
// })



export default class UserController {
    public async create(req: Request, res: Response, next: NextFunction): Promise<Response> {

        let { name, email, password, document, gender, phone, zipcode, street, city, country, state, addressNumber }: IUser = req.body

        const data: IUser = { name, email, password, document, gender, phone, zipcode, street, city, country, state, addressNumber }

        if (!(await register.isValid(data))) {
            return res.status(400).json({ error: "Error on validate user schema." })
        }

        try {
            const userExists = await verifyEmail(email)
            if (userExists) return res.status(errUserAlreadyExists.status).json({ errors: [errUserAlreadyExists] })

            if (password) {
                // create a password hash (bcrypt)
                const salt = await bcrypt.genSalt(12)
                const passwordHash = await bcrypt.hash(password, salt)
                password = passwordHash
            }

            let photo = ""
            const { file } = req
            if (file) {
                photo = `${process.env.SERVER_SECURITY}${process.env.SERVER_URL}:${process.env.SERVER_PORT}/api/v1/uploads/${file.filename}`
                // await uploadFilesController.UploadImageService(file) //algo pro futuro com cloud
            }

            const user = await createUser(name, email, password, photo, document, gender, phone, zipcode, street, city, country, state, addressNumber)

            const generateToken = new GenerateAuthToken()
            const token = await generateToken.generate(user.id)
            return res.status(200).json({ data: userSuccessReturnToken(user, token) })
        } catch (error) {
            console.log(error)
            return res.status(errCreateUser.status).json({ errors: [errCreateUser] })
        }
    }

    public async get(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const users = await getUsers()
            if (users.length == 0) return res.status(errUserNotFound.status).json({ errors: [errUserNotFound] })
            return res.status(200).json({ data: users.map(userSuccessReturn) })
        } catch (error) {
            return res.status(errGetUser.status).json({ errors: [errGetUser] })
        }
    }

    public async find(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id } = req.params
        try {
            const user = await findUser(id);
            if (user == null) return res.status(errUserNotFound.status).json({ errors: [errUserNotFound] })

            return res.status(200).json({ data: userSuccessReturn(user) })
        } catch (error) {
            console.log(error)
            return res.status(errGetUser.status).json({ errors: [errGetUser] })
        }
    }

    public async put(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id } = req.params
        const { name, email, password, photo, document, gender, phone, zipcode, street, city, country, state, addressNumber }: IUser = req.body
        const data: IUser = { name, email, password, photo, document, gender, phone, zipcode, street, city, country, state, addressNumber }

        try {
            const product = await put(id, data);
            if (product == null) return res.status(errUserNotFound.status).json({ errors: [errUserNotFound] })

            return res.status(200).json({ data: userSuccessReturn(product) })
        } catch (error) {
            return res.status(errUpdateUser.status).json({ errors: [errUpdateUser] })
        }
    }

    public async destroy(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id } = req.params

        try {
            const product = await destroy(id);
            if (product == null) return res.status(errUserNotFound.status).json({ errors: [errUserNotFound] })
            return res.status(200).json({ data: "Usuário deletado com sucesso!" })

        } catch (error) {
            return res.status(errDeleteUser.status).json({ errors: [errDeleteUser] })
        }
    }

}