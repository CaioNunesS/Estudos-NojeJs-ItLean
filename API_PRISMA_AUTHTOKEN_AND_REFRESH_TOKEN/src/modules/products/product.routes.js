import { Router } from 'express';

import {
  create,
  findAll,
  exclude,
  update,
  findById,
} from './product.controller.js';
import {
  isAuthenticated,
  validate,
  asyncWrapper,
  handlePagination,
} from '../../middleware/index.js';
import { productSchema } from './product.schema.js';

const productRoutes = Router();

productRoutes.post(
  '/',
  isAuthenticated,
  validate(productSchema),
  asyncWrapper(create)
);
productRoutes.get('/', handlePagination, asyncWrapper(findAll));
productRoutes.delete('/:id', isAuthenticated, asyncWrapper(exclude));
productRoutes.put(
  '/:id',
  isAuthenticated,
  validate(productSchema),
  asyncWrapper(update)
);
productRoutes.get('/:id', isAuthenticated, asyncWrapper(findById));

export default productRoutes;
