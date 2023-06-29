import { welcomeSMSTemplate } from '../../../templates/sms/welcomeSms.js';
import { sendSms } from './sms.service.js';

export const create = async (req, res) => {
  const { name, phone } = req.body;
  const message = await welcomeSMSTemplate({ name });

  const result = await sendSms({ message, phone });

  return res
    .status(201)
    .json({ message: 'SMS sent successfully', data: result });
};
