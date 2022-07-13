import {Router} from 'express'
const routes = Router()

import Products from '../../controller/v1/ProductController'
const ProductController = new Products()

routes.post("/", ProductController.create)
routes.get("/", ProductController.get)
routes.get("/:id", ProductController.find)
routes.put("/:id", ProductController.put)
routes.delete("/:id", ProductController.destroy)

export default routes;