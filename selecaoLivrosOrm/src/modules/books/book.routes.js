import { Router } from 'express'
import { create, listAll, remove, findById, update } from './book.controller.js'
import { validate } from '../../middlewares/validate.js'
import { asyncWrapper } from '../../middlewares/asyncWrapper.js'
import { newBook } from './book.validation.js'
import { isAuthenticated } from '../../middlewares/isAuthenticated.js'

const bookRoutes = Router()

bookRoutes.get('/', isAuthenticated, asyncWrapper(listAll))
bookRoutes.get('/:id', isAuthenticated, asyncWrapper(findById))
bookRoutes.post('/', isAuthenticated, validate(newBook), asyncWrapper(create))
bookRoutes.put('/:id', isAuthenticated, asyncWrapper(update))
bookRoutes.delete('/:id', isAuthenticated, asyncWrapper(remove))

export { bookRoutes }