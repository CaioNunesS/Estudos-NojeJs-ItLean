import { db } from '../../config/db.js';
import { throwError } from '../../utils/index.js';

import { resolve } from 'path';
import { existsSync, unlinkSync } from 'fs';

import {
  findProductsByImagePhoto,
  updateProduct,
} from '../products/product.service.js';

export const uploadProductImage = async ({ photo, productId }) => {
  try {
    if (!photo) throwError('Please, select a file');
    const result = db.products.update({
      data: {
        photo,
      },
      where: {
        id: productId,
      },
    });
    return result;
  } catch (error) {
    throwError('Error upload image');
  }
};

export const deleteProductImage = async imageName => {
  try {
    const imagePath = resolve('uploads', imageName);

    if (!existsSync(imagePath)) throwError('Image not found.');

    const photoProducts = await findProductsByImagePhoto(imageName);

    for (const product of photoProducts) {
      await updateProduct(product.id, {
        photo: null,
      });
    }
    return unlinkSync(imagePath);
  } catch (error) {
    console.log('error ==>', error);
    throwError('Error delete image');
  }
};
