import { Router } from 'express'
import { login } from './auth.controller.js'
import { loginSchema } from './auth.validation.js'
import { asyncWrapper } from '../../middlewares/asyncWrapper.js'
import { validate } from '../../middlewares/validate.js'

const userRoutesAuth = Router()

// jamais fazer rota de autenticação com get
userRoutesAuth.post('/login', validate(loginSchema), asyncWrapper(login))

export { userRoutesAuth }