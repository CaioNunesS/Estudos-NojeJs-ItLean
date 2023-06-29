import { db } from '../../config/db.js';
import { throwError } from '../../utils/index.js';
import { findProductById } from '../products/product.service.js';

export const createOrder = async products => {
  try {
    const value = await SumProductsPrice(products);

    const result = await db.orders.create({
      data: {
        value,
        products: {
          connect: products.map(product => ({ id: product })),
        },
      },
      include: {
        products: true,
      },
    });
    return result;
  } catch (error) {
    console.log('error ==>', error);
    throwError('Erro create order');
  }
};

const SumProductsPrice = async products => {
  let productPrice = 0;
  for (const productId of products) {
    const product = await findProductById(productId);
    productPrice += Number.parseFloat(product.price);
  }

  return productPrice.toFixed(2);
};

export const findOrderById = async id => {
  try {
    const result = await db.orders.findUnique({
      select: {
        id: true,
        value: true,
        isPaid: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id,
      },
    });

    return result;
  } catch (error) {
    throwError('Order not found');
  }
};

export const updateOrder = async (id, products) => {
  try {
    const getOrder = await findOrderById(id);
    const value = await SumProductsPrice(products);

    if (!getOrder) throwError('Order not found');

    if (getOrder.isPaid == true) throwError('Order already paid');

    const result = await db.orders.update({
      data: {
        value,
        products: {
          connect: products.map(product => ({ id: product })),
        },
      },
      where: {
        id,
      },
    });

    return result;
  } catch (error) {
    console.log('error ==>', error);
    throwError('Error find order');
  }
};
