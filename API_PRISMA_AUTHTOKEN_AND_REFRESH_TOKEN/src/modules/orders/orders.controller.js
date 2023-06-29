import { createOrder } from './orders.service.js';

export const create = async (req, res) => {
  const { products } = req.body;

  const result = await createOrder(products);

  return res.json({
    data: result,
    message: 'Order created successfully',
  });
};
