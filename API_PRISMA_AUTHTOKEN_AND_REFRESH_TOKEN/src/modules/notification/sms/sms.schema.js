import { object, string } from 'zod';
import { phoneRegex } from '../../../utils/index.js';

export const smsSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }).trim(),
    phone: string({
      required_error: 'Phone is required',
    }).regex(phoneRegex, 'Invalid Number!'),
  }),
});
