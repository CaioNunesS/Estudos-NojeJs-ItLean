import { Router } from 'express';
import { isAuthenticated, isAdmin } from '../../middleware/index.js';
import { profile, findAll } from './user.controller.js';

const userRoutes = Router();

userRoutes.get('/profile', isAuthenticated, profile);
userRoutes.get('/', isAuthenticated, isAdmin, findAll);

export default userRoutes;
