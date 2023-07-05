import { createOrder, updateOrder } from './orders.service.js';

export const create = async (req, res) => {
  const { products, couponId } = req.body;
  const { userId } = req.payload;

  const result = await createOrder({ products, couponId, userId });
  return res.json({
    data: result,
    message: 'Order created successfully',
  });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { products } = req.body;

  const result = await updateOrder(id, products);

  return res.json({ data: result });
};
