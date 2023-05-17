import { Router } from 'express';
import { login } from '../auth/auth.controller.js';
import { newLogin } from '../auth/auth.validation.js';
import { asyncWrapper } from '../../middlewares/asyncWrapper.js';
import { validate } from '../../middlewares/validate.js';
import { isAuthenticated } from '../../middlewares/isAuthenticated.js';
import { profile } from './auth.controller.js';

const userRoutesAuth = Router()

// jamais fazer rota de autenticação com get
userRoutesAuth.post('/login', validate(newLogin), asyncWrapper(login))
userRoutesAuth.get('/profile', isAuthenticated, asyncWrapper(profile))
export { userRoutesAuth }