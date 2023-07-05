import { db } from '../../config/db.js';
import { throwError } from '../../utils/index.js';
import { findProductById } from '../../modules/products/product.service.js';
import {
  findCouponById,
  // revokeCoupon,
  verifyUserCoupon,
} from '../coupons/coupons.service.js';

export const createOrder = async ({ products, couponId, userId }) => {
  try {
    const {
      // id,
      value: valueDiscount,
      revoked,
    } = await findCouponById(couponId);
    if (revoked == true) throwError('Coupon invalid');
    const value = await sumProductsPrice({ products, valueDiscount });

    const result = await db.orders.create({
      data: {
        value,
        products: {
          create: products.map(product => ({
            Products: {
              connect: {
                id: product,
              },
            },
          })),
        },
        coupons: couponId
          ? {
              connect: { id: couponId },
            }
          : undefined,
        User: {
          connect: { id: userId },
        },
        discount: valueDiscount ?? '0',
      },
      include: {
        products: true,
        coupons: couponId ? true : false,
        User: {
          select: {
            name: true,
          },
        },
      },
    });
    await verifyUserCoupon(userId, couponId);
    return result;
  } catch (error) {
    console.log('error ==>', error);
    throwError('Erro create order');
  }
};

const sumProductsPrice = async ({ products, valueDiscount }) => {
  let productPrice = 0;
  for (const productId of products) {
    const product = await findProductById(productId);
    productPrice += Number.parseFloat(product.price);
  }
  return (productPrice - (valueDiscount ?? 0)).toFixed(2);
};

export const findOrderById = id => {
  try {
    const result = db.orders.findUnique({
      select: {
        id: true,
        value: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id,
      },
    });

    return result;
  } catch (error) {
    throwError('Order not found', 404);
  }
};

export const updateOrder = async (id, products) => {
  try {
    const getOrder = await findOrderById(id);
    const value = await sumProductsPrice(products);

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
