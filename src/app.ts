import 'dotenv/config'; //informações privadas
import './services/v1/mongoose'

import express from 'express'
import cors from 'cors'
import routes from './routes'
//cria o app
export const app = express()

//configuração dos middlewares
app.use(express.json())
app.use(cors())

//rotas
app.use('/api', routes)