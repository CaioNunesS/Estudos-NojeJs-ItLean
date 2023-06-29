import { generateReport } from './reports.service.js';
import { v4 as uuidv4 } from 'uuid';

export const create = async (req, res) => {
  const { title, dataSet, labels } = req.body;

  const result = await generateReport({ title, dataSet, labels });

  const download = Buffer.from(result, 'base64');

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${uuidv4()}.pdf`);

  return res.send(download);
};
