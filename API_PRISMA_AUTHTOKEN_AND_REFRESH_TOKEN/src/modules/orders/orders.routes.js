import { Router } from 'express';
import {
  isAuthenticated,
  hasRole,
  asyncWrapper,
  validate,
} from '../../middleware/index.js';
import { create } from './orders.controller.js';
import { ordersSchema } from './orders.schema.js';

const ordersRoutes = Router();

ordersRoutes.post(
  '/',
  isAuthenticated,
  hasRole(['ADMIN', 'CLIENT']),
  validate(ordersSchema),
  asyncWrapper(create)
);

export default ordersRoutes;
