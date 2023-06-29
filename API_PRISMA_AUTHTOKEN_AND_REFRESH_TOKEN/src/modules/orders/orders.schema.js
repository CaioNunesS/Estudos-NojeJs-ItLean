import { object, string } from 'zod';

export const ordersSchema = object({
  body: object({
    products: string({
      required_error: 'Products is required',
    })
      .array()
      .nonempty(),
  }),
});
