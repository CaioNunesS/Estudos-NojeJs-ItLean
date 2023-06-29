import { Router } from 'express';
import multer from 'multer';
import {
  diskStorage,
  imageFilter,
  limits,
  asyncWrapper,
  isAuthenticated,
} from '../../middleware/index.js';
import {
  fileUpload,
  viewImage,
  uploadImage,
  excludeProductImage,
} from './file.controller.js';

const fileRoutes = Router();

fileRoutes.post(
  '/upload',
  multer({
    storage: diskStorage,
    limits,
    fileFilter: imageFilter,
  }).single('file'),
  asyncWrapper(fileUpload)
);

fileRoutes.patch(
  '/:productId',
  multer({
    storage: diskStorage,
    limits,
    fileFilter: imageFilter,
  }).single('file'),
  isAuthenticated,
  asyncWrapper(uploadImage)
);

fileRoutes.get('/view/:imageName', asyncWrapper(viewImage));

fileRoutes.delete('/delete/:imageName', asyncWrapper(excludeProductImage));

export default fileRoutes;
