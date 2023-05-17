import { Router } from 'express';
import { userRoutes } from './modules/users/user.routes.js';
import { userRoutesAuth } from './modules/auth/auth.routes.js';
import { fileRoutes } from './modules/files/file.routes.js'
import { productRoutes } from './modules/products/product.routes.js'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/auth', userRoutesAuth)
routes.use('/file', fileRoutes)
routes.use('/product', productRoutes)

export { routes }

