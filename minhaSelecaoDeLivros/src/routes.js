import { Router } from 'express'
import { userRoutes } from './modules/users/user.routes.js'
import { userRoutesAuth } from './modules/auth/auth.routes.js'
import { authorRoutes } from './modules/author/author.routes.js'
import { bookRoutes } from './modules/books/book.routes.js'

const routes = Router()

routes.use('/', userRoutes, userRoutesAuth, authorRoutes, bookRoutes)

export { routes }

