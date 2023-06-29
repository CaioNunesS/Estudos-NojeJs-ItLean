import { db } from '../../config/db.js';
import { throwError } from '../../utils/index.js';

import { resolve } from 'path';
import { existsSync, unlink } from 'fs';

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

    return unlink(imagePath);

    // await db.products.upsert({
    //   data: {
    //     photo: null,
    //   },
    //   where: {
    //     id,
    //   },
    // });
  } catch (error) {
    throwError('Error delete image');
  }
};
