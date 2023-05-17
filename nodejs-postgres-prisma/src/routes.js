import { Router } from 'express';
import quotesRoutes from './modules/quotes/quote.routes.js';
import logsRoutes from './modules/logs/logs.routes.js';

const routes = Router();

routes.use('/quotes', quotesRoutes);
routes.use('/logs', logsRoutes);

export default routes;
