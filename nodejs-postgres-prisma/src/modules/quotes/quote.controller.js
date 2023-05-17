import { findAll, create } from './quote.service.js';

export const getAll = async (req, res) => {
  try {
    const { page } = req.query;
    const currentPage = page || 1;
    const listPerPage = 5;
    const offset = (currentPage - 1) * listPerPage;

    const allQuotes = await findAll({ offset, listPerPage });

    res.json({
      data: allQuotes,
      meta: {
        page: currentPage,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { quote, author } = req.body;

    await create({ quote, author });

    res.status(201).json({ message: 'quote created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
