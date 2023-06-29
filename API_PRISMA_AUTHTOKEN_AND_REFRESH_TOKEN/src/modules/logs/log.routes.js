import { Router } from 'express';
import { getAll } from './logs.controller.js';

const logsRoutes = Router();

logsRoutes.get('/', getAll);

export default logsRoutes;
