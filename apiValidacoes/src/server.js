import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import cors from 'cors'

import { connectMongoDB } from './config/db.js'
import { appError } from './utils/appError.js'
import { routes } from './routes.js'
import { errorHandler } from './middlewares/erroHandler.js'

const app = express()
const port = process.env.PORT || 3000

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

connectMongoDB()

// app.use((err, req, res, next)=>{
//     if (err instanceof Error){
//         return res.status(400).json({
//             error: err.message
//         })
//     } 

//     return res.status(500).json({
//         status: 'error',
//         message: 'Internal server error.'
//     })
// })

app.use('/api', routes)

app.use((req, res, next) => {
    throw new appError('Resource not found', 404)
})

// app.use((err, req, res, next) => {
//     console.log(err);
//     if (err.code === 11000) {
//         return res.status(500).json({ message: "ValidationError", details: "Email already registered" });
//     }
//     throw new appError("Resource not found", 404);
// });

app.use(errorHandler)

app.listen(port, () => console.log('Server online'))






