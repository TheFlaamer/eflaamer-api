import {Router} from 'express'
const routes = Router()

import v1 from './v1/index'

routes.get("/", (req, res)=>{
    res.send("teste")
})

routes.use("/v1", v1)

export default routes;