import { hashSync, compare } from 'bcrypt';
import { db } from '../../config/index.js';
import { throwError } from '../../utils/customError.js';

export const findUserByEmail = email => {
  try {
    return db.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    throwError('User not found', 404);
  }
};

export const createUser = user => {
  try {
    user.password = hashSync(user.password, 12);
    return db.user.create({
      data: user,
    });
  } catch (error) {
    throwError('Erro create user');
  }
};

export const findUserById = id => {
  try {
    return db.user.findUnique({
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        password: false,
        verificationCode: false,
      },
      where: {
        id,
      },
    });
  } catch (error) {
    throwError('User not found', 404);
  }
};

export const findAllUser = async ({ offset, listPerPage, query, order }) => {
  try {
    return await db.user.findMany({
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
        name: true,
        role: true,
      },
      skip: offset,
      take: listPerPage,
    });
  } catch (error) {
    throwError('Erro find users');
  }
};

export const comparePassword = async ({ email, password }) => {
  try {
    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      throwError('User not found', 404);
    }

    const validPassword = await compare(password, existingUser.password);

    if (!validPassword) {
      throwError('Invalid login credentials');
    }

    return existingUser;
  } catch (error) {
    throwError('Erro find user');
  }
};

export const findUserByGithubId = gitHubId => {
  try {
    return db.user.findUnique({
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        gitHubId: true,
      },
      where: {
        gitHubId,
      },
    });
  } catch (error) {
    throwError('User not found', 404);
  }
};
