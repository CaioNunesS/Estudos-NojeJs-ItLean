import { object, string, number } from 'zod';

export const reportPdfShema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    labels: string({
      required_error: 'Labels are required',
    }).array(),
    dataSet: number({
      required_error: 'DataSet are required',
    }).array(),
  }),
});
