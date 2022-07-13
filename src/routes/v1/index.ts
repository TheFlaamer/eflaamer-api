import {Router} from 'express'
const routes = Router()

import products from './products'
import user from './user'

routes.use("/products", products)
routes.use("/user", user)

export default routes;