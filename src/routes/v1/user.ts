import {Router} from 'express'
const routes = Router()

import Users from '../../controller/v1/UserController'
const UserController = new Users()

routes.post("/", UserController.create)
routes.get("/", UserController.get)
routes.get("/:id", UserController.find)
routes.put("/:id", UserController.put)
routes.delete("/:id", UserController.destroy)

export default routes;