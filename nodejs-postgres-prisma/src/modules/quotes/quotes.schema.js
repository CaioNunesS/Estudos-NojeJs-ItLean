import { object, string } from 'zod';

export const quoteSchema = object({
  body: object({
    quote: string({
      required_error: 'Quote is required',
    }).min(1, 'Must to be at least 1 character'),
    author: string({
      required_error: 'Author is required',
    }).min(1, 'Must to be at least 1 character'),
  }),
});
