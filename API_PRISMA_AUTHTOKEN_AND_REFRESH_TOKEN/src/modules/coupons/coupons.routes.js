import { Router } from 'express';
import {
  validate,
  isAuthenticated,
  hasRole,
  asyncWrapper,
  handlePagination,
} from '../../middleware/index.js';
import { couponSchema } from './coupons.schema.js';
import { create, findAll, findById } from './coupons.controller.js';

const couponsRoutes = Router();

couponsRoutes.post(
  '/',
  isAuthenticated,
  validate(couponSchema),
  hasRole(['ADMIN']),
  asyncWrapper(create)
);
couponsRoutes.get('/', handlePagination, asyncWrapper(findAll));
couponsRoutes.get('/:id', asyncWrapper(findById));

export default couponsRoutes;
