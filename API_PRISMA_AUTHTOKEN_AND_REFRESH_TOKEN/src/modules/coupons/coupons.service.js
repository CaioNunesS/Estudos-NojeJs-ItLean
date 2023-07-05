import { db } from '../../config/index.js';
import { throwError } from '../../utils/index.js';

export const createCoupon = async ({ title, description, value }) => {
  try {
    const getCoupon = await findCouponByTitle(title);

    if (getCoupon) throwError('Coupon alredy exists', 409);

    const resut = await db.coupons.create({
      data: { title, description, value },
    });

    return resut;
  } catch (error) {
    throwError(error.message, error.statusCode);
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
    throwError('Error find coupons');
  }
};

export const findCouponByTitle = async title => {
  try {
    return db.coupons.findFirst({
      where: {
        title,
      },
    });
  } catch (error) {
    throwError('Error find coupon');
  }
};

export const findCouponById = async id => {
  try {
    if (!id) return 0;
    return db.coupons.findUnique({
      where: {
        id,
      },
      select: {
        value: true,
        id: true,
      },
    });
  } catch (error) {
    throwError('Error find coupon');
  }
};

export const revokeCoupon = async id => {
  try {
    if (!id) return null;
    return db.coupons.update({
      where: {
        id,
      },
      data: {
        revoked: true,
      },
    });
  } catch (error) {
    throwError('Error find coupon');
  }
};

export const verifyUserCoupon = async (userId, couponId) => {
  if (couponId != undefined) {
    const userUseCoupon = await db.userCoupons.findMany({
      where: {
        OR: [
          {
            userId: userId,
            couponsId: couponId,
          },
          {
            userId: couponId,
            couponsId: userId,
          },
        ],
      },
    });
    if (userUseCoupon.length > 0) {
      throwError('User used the coupon');
    } else {
      await db.userCoupons.create({
        data: { userId, couponsId: couponId },
      });
    }
  }
};
