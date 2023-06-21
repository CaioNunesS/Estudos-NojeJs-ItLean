import { hashSync, compare } from 'bcrypt';
import { db } from '../../config/db.js';

export const findUserByEmail = email => {
  try {
    return db.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    throw new Error('User not found');
  }
};

export const createUser = user => {
  try {
    user.password = hashSync(user.password, 12);
    return db.user.create({
      data: user,
    });
  } catch (error) {
    throw new Error('User not found');
  }
};

export const findUserById = id => {
  try {
    return db.user.findUnique({
      select: {
        id: true,
        email: true,
        role: true,
        password: false,
        verificationCode: false,
      },
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error('User not found');
  }
};

export const comparePassword = async ({ email, password }) => {
  try {
    const existingUser = await findUserByEmail(email);

    if (!existingUser) throw new Error('User not found');

    const validPassword = await compare(password, existingUser.password);

    if (!validPassword) throw new Error('Invalid Login Credential');

    return existingUser;
  } catch (error) {
    throw new Error('User not found');
  }
};

export const findAllUser = async ({ offset, listPerPage, query, order }) => {
  try {
    return db.user.findMany({
      where: {
        email: {
          contains: query,
        },
      },
      orderBy: {
        createdAt: order ? order : 'desc',
      },
      select: {
        id: true,
        email: true,
      },
      skip: offset,
      take: listPerPage,
    });
  } catch (error) {
    throw new Error('Users not found');
  }
};
