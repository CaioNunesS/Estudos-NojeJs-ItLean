import { Router } from 'express';
import { getAll, register } from './quote.controller.js';
import { validate } from '../../middleware/index.js';

const quoteRoutes = Router();

quoteRoutes.get('/', getAll);
quoteRoutes.post('/', validate(register));

export default quoteRoutes;
