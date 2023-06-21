import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { db } from '../../config/index.js';
import { hashToken, generateTokens } from '../../utils/index.js';
import {
  findUserByEmail,
  createUser,
  comparePassword,
  findUserById,
} from '../users/users.service.js';

export const addRefreshTokenToWhiteList = ({ jwtId, refreshToken, userId }) => {
  try {
    return db.refreshToken.create({
      data: {
        id: jwtId,
        hashedToken: hashToken(refreshToken),
        userId,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const findRefreshTokenById = id => {
  try {
    return db.refreshToken.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteRefreshToken = id => {
  try {
    return db.refreshToken.update({
      where: {
        id,
      },
      data: {
        revoked: true,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const revokeTokens = userId => {
  return db.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
};

export const register = async ({ email, password }) => {
  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      throw new Error('Email already is use');
    }

    const user = await createUser({ email, password });

    const result = await returnResponse({ user });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const authenticatedUserByEmailAndPassword = async ({
  email,
  password,
}) => {
  try {
    const getUser = await comparePassword({ email, password });

    const result = await returnResponse({ user: getUser });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const refreshToken = async ({ refreshToken }) => {
  try {
    if (!refreshToken) throw new Error('Missing refresh token.');

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const savedRefreshToken = await findRefreshTokenById(payload.jwtId);

    if (!savedRefreshToken || savedRefreshToken.revoked === true)
      throw new Error('Unauthorized');

    const hashedtoken = hashToken(refreshToken);

    if (hashedtoken !== savedRefreshToken.hashedToken)
      throw new Error('Unauthorized');

    const user = await findUserById(payload.userId);

    if (!user) throw new Error('Unauthorized');

    await deleteRefreshToken(savedRefreshToken.id);

    const result = await returnResponse({ user });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const returnResponse = async ({ user }) => {
  const jwtId = uuidv4();

  const { accessToken, refreshToken } = generateTokens(user, jwtId);

  await addRefreshTokenToWhiteList({
    jwtId,
    refreshToken,
    userId: user.id,
  });

  return {
    accessToken,
    refreshToken,
  };
};
