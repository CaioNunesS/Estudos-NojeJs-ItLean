import {
  createCoupon,
  findAllCoupons,
  findCouponById,
} from './coupons.service.js';

export const findAll = async (req, res) => {
  const { query, order } = req.query;
  const { currentPage, listPerPage, offset } = req.pagination;

  const result = await findAllCoupons({ listPerPage, offset, query, order });

  res.json({
    data: result,
    meta: {
      page: currentPage,
    },
  });
};

export const create = async (req, res) => {
  const { title, description, value } = req.body;

  const result = await createCoupon({ title, description, value });

  return res.status(201).json({
    data: result,
    message: 'Coupon created successfully',
  });
};

export const findById = async (req, res) => {
  const { id } = req.params;

  const result = await findCouponById(id);
  return res.json({ data: result });
};
