import { object, string } from 'zod';

export const productSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }).trim(),
    price: string({
      required_error: 'Price is required',
    }).trim(),
    photo: string({
      invalid_type_error: 'Photo must to be a string',
    })
      .trim()
      .optional(),
  }),
});
