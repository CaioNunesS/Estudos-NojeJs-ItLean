import { Router } from 'express'
import { create, update, index } from './user.controller.js'
import { validate } from '../../middlewares/validate.js'
import { asyncWrapper } from '../../middlewares/asyncWrapper.js'
import { newUser } from './user.validation.js'

const userRoutes = Router()

userRoutes.get('/user', asyncWrapper(index))
userRoutes.post('/user/add', validate(newUser), asyncWrapper(create))
userRoutes.put('/user/:id', asyncWrapper(update))

export { userRoutes }