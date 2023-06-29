import { findUserById, findAllUser } from './users.service.js';

export const profile = async (req, res) => {
  const { userId } = req.payload;

  const result = await findUserById(userId);
  return res.json(result);
};

export const findAll = async (req, res) => {
  const { query, order } = req.query;

  const { currentPage, listPerPage, offset } = req.pagination;

  const result = await findAllUser({ listPerPage, offset, query, order });

  res.json({
    data: result,
    meta: {
      page: currentPage,
    },
  });
};
