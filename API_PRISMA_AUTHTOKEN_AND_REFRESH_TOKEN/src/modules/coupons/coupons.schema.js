import { object, string } from 'zod';

export const couponSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    description: string({
      required_error: 'Description is required',
    }),
    value: string({
      required_error: 'Value is required',
    }),
  }),
});
