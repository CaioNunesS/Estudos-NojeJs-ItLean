import { Router } from 'express';
import { validate, asyncWrapper } from '../../middleware/index.js';
import { sendMailSchema } from './email/email.schema.js';
import { sendMailWelcome } from './email/email.controller.js';
import { smsSchema } from './sms/sms.schema.js';
import { create } from './sms/sms.controller.js';

const notificationRoutes = Router();

notificationRoutes.post(
  '/send-email',
  validate(sendMailSchema),
  asyncWrapper(sendMailWelcome)
);

notificationRoutes.post('/send-sms', validate(smsSchema), asyncWrapper(create));

export default notificationRoutes;
