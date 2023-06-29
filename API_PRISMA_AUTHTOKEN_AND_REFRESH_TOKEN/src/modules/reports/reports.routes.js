import { Router } from 'express';
import { reportPdfShema } from './reports.schema.js';
import { create } from './reports.controller.js';
import { validate, asyncWrapper } from '../../middleware/index.js';

const reportRoutes = Router();

reportRoutes.post('/pdf', validate(reportPdfShema), asyncWrapper(create));

export default reportRoutes;
