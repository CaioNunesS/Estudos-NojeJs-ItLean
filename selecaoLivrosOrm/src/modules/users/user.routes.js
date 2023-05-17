import { Router } from 'express'
import { create, findById, listAll, update, remove } from './user.controller.js'
import { validate } from '../../middlewares/validate.js'
import { asyncWrapper } from '../../middlewares/asyncWrapper.js'
import { newUser } from './user.validation.js'
import { isAuthenticated } from '../../middlewares/isAuthenticated.js'
import { isAdministrator } from '../../middlewares/admin.js'

const userRoutes = Router()

userRoutes.get('/', isAuthenticated, asyncWrapper(listAll))
userRoutes.get('/:id', isAuthenticated, asyncWrapper(findById))
userRoutes.post('/', validate(newUser), asyncWrapper(create))
userRoutes.put('/:id', isAuthenticated, asyncWrapper(update))
userRoutes.delete('/:userId', isAuthenticated, isAdministrator, asyncWrapper(remove))

export { userRoutes }