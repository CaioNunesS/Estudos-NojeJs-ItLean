import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import cors from 'cors'

import { connectMongoDB } from './configs/db.js'
import { appError } from './utils/appError.js'
import { routes } from './routes.js'
import { errorHandler } from './middlewares/erroHandler.js'

const app = express()
const port = process.env.PORT || 3000

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

connectMongoDB()

app.use('/api', routes)

app.use((req, res, next) => {
    throw new appError('Resource not found', 404)
})

app.use(errorHandler)

app.listen(port, () => console.log('Server online'))






