import { Router } from 'express';
import {
  isAuthenticated,
  hasRole,
  asyncWrapper,
  validate,
} from '../../middleware/index.js';
import { create, update } from './orders.controller.js';
import { ordersSchema } from './orders.schema.js';

const ordersRoutes = Router();

ordersRoutes.post(
  '/',
  isAuthenticated,
  hasRole(['ADMIN', 'CLIENT']),
  validate(ordersSchema),
  asyncWrapper(create)
);

ordersRoutes.put(
  '/:id',
  isAuthenticated,
  hasRole(['CLIENT']),
  asyncWrapper(update)
);

export default ordersRoutes;
