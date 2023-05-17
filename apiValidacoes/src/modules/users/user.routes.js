import { Router } from 'express'
import { create, update, index } from './user.controller.js'
import { validate } from '../../middlewares/validate.js'
import { asyncWrapper } from '../../middlewares/asyncWrapper.js'
import { newUser } from './user.validation.js'
import { isAuthenticated } from '../../middlewares/isAuthenticated.js'

const userRoutes = Router()

userRoutes.get('/', isAuthenticated, asyncWrapper(index))
userRoutes.post('/', validate(newUser), asyncWrapper(create))
userRoutes.put('/:id',isAuthenticated, asyncWrapper(update))

export { userRoutes }