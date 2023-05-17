import { Router } from 'express'
import { bookList, deleteBook, getBookById, updateBook, insertBook } from './books.controller.js'
import { validate } from '../../middlewares/validate.js'
import { asyncWrapper } from '../../middlewares/asyncWrapper.js'
import { newBook } from './book.validation.js'

const bookRoutes = Router()

bookRoutes.get('/book/list', asyncWrapper(bookList))
bookRoutes.get('/book/:id', asyncWrapper(getBookById))
bookRoutes.post('/book/add', validate(newBook), asyncWrapper(insertBook))
bookRoutes.put('/book/update/:id', asyncWrapper(updateBook))
bookRoutes.delete('/book/delete/:id', asyncWrapper(deleteBook))


export { bookRoutes }