import { findUserById, findAllUser } from './users.service.js';

export const profile = async (req, res) => {
  try {
    const { userId } = req.payload;

    const result = await findUserById(userId);
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const { page, limit, query, order } = req.query;

    if (!Number.isInteger(+page)) throw new Error('Invalid Page');

    const currentPage = Number(page) || 1;
    const listPerPage = Number(limit) || 5;
    const offset = (currentPage - 1) * listPerPage;

    const result = await findAllUser({ listPerPage, offset, query, order });

    res.json({
      data: result,
      meta: {
        page: currentPage,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
