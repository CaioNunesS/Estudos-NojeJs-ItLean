import { Router } from 'express';
import {
  isAuthenticated,
  hasRole,
  handlePagination,
  asyncWrapper,
} from '../../middleware/index.js';
import { profile, findAll } from './user.controller.js';

const userRoutes = Router();

userRoutes.get('/profile', isAuthenticated, asyncWrapper(profile));
userRoutes.get(
  '/',
  isAuthenticated,
  hasRole(['ADMIN']),
  handlePagination,
  asyncWrapper(findAll)
);

export default userRoutes;
