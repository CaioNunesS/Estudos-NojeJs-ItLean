import path from 'path';
import { __dirname } from '../../utils/index.js';

export const getAll = async (req, res) => {
  const logFilePath = path.join(__dirname, '..', 'logs', 'access.log');
  res.sendFile(logFilePath);
};
