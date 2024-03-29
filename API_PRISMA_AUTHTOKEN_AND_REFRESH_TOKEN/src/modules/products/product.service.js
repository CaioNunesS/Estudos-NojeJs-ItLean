import { db } from '../../config/index.js';
import { throwError } from '../../utils/index.js';

export const createProduct = async ({ name, price, photo }) => {
  try {
    const getProduct = await findProductByName(name);

    if (getProduct) throwError('Product already exists', 409);

    const result = await db.products.create({
      data: {
        name,
        price,
        photo,
      },
    });
    return result;
  } catch (error) {
    throwError('Error create product');
  }
};

const findProductByName = async name => {
  try {
    return db.products.findFirst({
      where: {
        name,
      },
    });
  } catch (error) {
    throwError('Error find product');
  }
};

export const findAllProducts = async ({
  offset,
  listPerPage,
  query,
  order,
}) => {
  try {
    return db.products.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      orderBy: {
        createdAt: order ? order : 'desc',
      },
      skip: offset,
      take: listPerPage,
    });
  } catch (error) {
    throwError('Error find products');
  }
};

export const deleteProduct = async id => {
  try {
    await findProductById(id);

    return await db.products.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throwError('Error remove product');
  }
};

export const findProductById = async id => {
  try {
    const result = await db.products.findUnique({
      where: {
        id,
      },
    });

    if (!result) throwError('Product not found', 404);

    return result;
  } catch (error) {
    throwError('Error find product');
  }
};

export const updateProduct = async (id, product) => {
  try {
    await findProductById(id);

    const result = await db.products.update({
      data: product,
      where: {
        id,
      },
    });

    return result;
  } catch (error) {
    throwError('Error update product');
  }
};

export const findProductsByImagePhoto = async imageName => {
  try {
    return await db.products.findMany({
      where: {
        photo: {
          contains: imageName,
        },
      },
    });
  } catch (error) {
    throwError('Error find products photo');
  }
};
