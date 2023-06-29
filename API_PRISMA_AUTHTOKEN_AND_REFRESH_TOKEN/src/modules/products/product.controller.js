import {
  createProduct,
  findAllProducts,
  deleteProduct,
  updateProduct,
  findProductById,
} from './product.service.js';

export const create = async (req, res) => {
  const { name, price, photo } = req.body;

  const result = await createProduct({ name, price, photo });

  return res.status(201).json({
    data: result,
    message: 'Product created successfully',
  });
};

export const findAll = async (req, res) => {
  const { query, order } = req.query;

  const { currentPage, listPerPage, offset } = req.pagination;

  const products = await findAllProducts({ listPerPage, offset, query, order });

  return res.json({
    data: products,
    meta: {
      page: currentPage,
    },
  });
};

export const exclude = async (req, res) => {
  const { id } = req.params;

  await deleteProduct(id);

  return res.status(200).json({ message: 'Product deleted' });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name, price, photo } = req.body;

  const result = await updateProduct({ id, name, price, photo });

  return res.status(201).json({ data: result, message: 'Product updated' });
};

export const findById = async (req, res) => {
  const { id } = req.params;
  const result = await findProductById({ id });

  return res.json({ data: result });
};
