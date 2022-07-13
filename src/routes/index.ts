import {Router} from 'express'
const routes = Router()

import fs from 'fs'
import multerConfig from '../config/v1/multer'

import v1 from './v1/index'

routes.get("/", (req, res)=>{
    res.status(200).json({data: "Welcome to eFlaamer API!"})
})

routes.get("/uploads/:filename", async (req, res)=>{
    const {filename} = req.params
    const file = fs.readFileSync(`${multerConfig.directory}/${filename}`)
    res.set("Content-Type", "image/jpeg")
    res.send(file)
})

routes.use("/v1", v1)

export default routes;