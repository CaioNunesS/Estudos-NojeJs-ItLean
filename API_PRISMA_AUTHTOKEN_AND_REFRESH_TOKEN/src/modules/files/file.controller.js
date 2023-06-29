import { resolve } from 'path';
import { existsSync } from 'fs';
import { throwError } from '../../utils/index.js';

import { deleteProductImage, uploadProductImage } from './file.service.js';

export const fileUpload = (req, res) => {
  if (!req.file) return throwError('Please select a file', 422);

  return res.json({ data: req.file });
};

export const viewImage = (req, res) => {
  const { imageName } = req.params;
  const imagePath = resolve('uploads', imageName);

  if (!existsSync(imagePath)) return throwError('Image not found', 404);

  return res.sendFile(imagePath);
};

export const uploadImage = async (req, res) => {
  const { productId } = req.params;
  const { filename } = req.file;

  const photo = `${process.env.URL_IMAGE}/${filename}`;

  await uploadProductImage({ photo, productId });

  return res
    .status(201)
    .json({ message: 'Upload successfully', data: req.file.filename });
};

export const excludeProductImage = async (req, res) => {
  const { imageName } = req.params;

  await deleteProductImage(imageName);

  return res.json({ message: 'Image deleted successfully' });
};
