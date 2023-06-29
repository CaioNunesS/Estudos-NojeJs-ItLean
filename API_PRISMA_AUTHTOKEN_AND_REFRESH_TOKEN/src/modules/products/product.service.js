import { db } from '../../config/index.js';
import { throwError } from '../../utils/customError.js';

export const createProduct = async ({ name, price, photo }) => {
  try {
    const getProduct = await findProductByName(name);

    if (getProduct) throwError('Product alredy exists', 409);

    const result = await db.products.create({
      data: {
        name,
        price,
        photo,
      },
    });
    return result;
  } catch (error) {
    throwError(error.message, error.statusCode);
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

export const updateProduct = async ({ id, name, price, photo }) => {
  try {
    await findProductById({ id });

    const result = await db.products.update({
      data: {
        name,
        price,
        photo,
      },
      where: {
        id,
      },
    });

    return result;
  } catch (error) {
    throwError('Error update product');
  }
};
