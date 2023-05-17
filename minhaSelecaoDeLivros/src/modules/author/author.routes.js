import { Router } from 'express'
import { insertAuthor, updateAuthor, deleteAuthor, getAuthorById, listAuthors } from './author.controller.js'
import { validate } from '../../middlewares/validate.js'
import { asyncWrapper } from '../../middlewares/asyncWrapper.js'
import { newAuthor } from './author.validation.js'

const authorRoutes = Router()

authorRoutes.post('/author/add', validate(newAuthor), asyncWrapper(insertAuthor))
authorRoutes.put('/author/update/:id', asyncWrapper(updateAuthor))
authorRoutes.get('/author/list', asyncWrapper(listAuthors))
authorRoutes.get('/author/:id', asyncWrapper(getAuthorById))
authorRoutes.delete('/author/delete/:id', asyncWrapper(deleteAuthor))


export { authorRoutes }