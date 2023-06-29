import { db } from '../../config/index.js';
import { throwError } from '../../utils/index.js';

export const createCoupon = async ({ title, description, value }) => {
  try {
    const getCoupon = await findCouponByTitle(title);

    if (getCoupon) throwError('Coupon already exists', 409);

    const result = await db.coupons.create({
      data: {
        title,
        description,
        value,
      },
    });

    return result;
  } catch (error) {
    throwError(error.message, error.statusCode);
  }
};

const findCouponByTitle = async title => {
  try {
    return db.coupons.findFirst({
      where: {
        title,
      },
    });
  } catch (error) {
    throwError('Error find coupons');
  }
};

export const findAllCoupons = async ({ offset, listPerPage, query, order }) => {
  try {
    return db.coupons.findMany({
      where: {
        title: {
          contains: query,
        },
        revoked: false,
      },
      orderBy: {
        createdAt: order ? order : 'desc',
      },
      skip: offset,
      take: listPerPage,
    });
  } catch (error) {
    throwError('Error find coupon');
  }
};

export const findCouponById = async ({ id }) => {
  try {
    const result = await db.coupons.findUnique({
      where: {
        id,
      },
    });

    if (!result) throwError('Coupon not found', 404);

    return result;
  } catch (error) {
    throwError('Error find coupon');
  }
};
