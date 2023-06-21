import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { sendMailSchema } from './email/email.schema.js';
import { sendMailWelcome } from './email/email.controller.js';

const notificationRoutes = Router();

notificationRoutes.post(
  '/send-email',
  validate(sendMailSchema),
  sendMailWelcome
);

export default notificationRoutes;
