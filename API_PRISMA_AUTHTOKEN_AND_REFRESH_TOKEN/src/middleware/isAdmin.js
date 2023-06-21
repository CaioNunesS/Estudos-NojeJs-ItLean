import { findUserById } from '../modules/users/users.service.js';

export const isAdmin = async (req, res, next) => {
  try {
    const { userId } = req.payload;

    const user = await findUserById(userId);

    if (user.role !== 'ADMIN')
      return res.status(401).json({ message: 'Not authorized' });

    return next();
  } catch (error) {
    throw new Error(error);
  }
};
