import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

import { getGithubUser, githubCallback } from './oAuth/index.js';
import { db } from '../../config/index.js';
import { hashToken, generateTokens, throwError } from '../../utils/index.js';
import {
  findUserByEmail,
  createUser,
  comparePassword,
  findUserById,
  findUserByGithubId,
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
    throwError('Erro add refreshToken');
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
    throwError('RefreshToken not found');
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
    throwError('RefreshToken not found');
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

export const register = async ({ email, password, name, gitHubId }) => {
  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      throwError('Email already is use');
    }

    const user = await createUser({ email, password, name, gitHubId });

    const result = await returnResponse({ user });

    return result;
  } catch (error) {
    throwError('Erro register user');
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
    throwError('Erro authenticate user');
  }
};

export const refreshToken = async ({ refreshToken }) => {
  try {
    if (!refreshToken) throw new Error('Missing refresh token.');

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const savedRefreshToken = await findRefreshTokenById(payload.jwtId);

    if (!savedRefreshToken || savedRefreshToken.revoked === true)
      throwError('Unauthorized');

    const hashedtoken = hashToken(refreshToken);

    if (hashedtoken !== savedRefreshToken.hashedToken)
      throwError('Unauthorized');

    const user = await findUserById(payload.userId);

    if (!user) throwError('Unauthorized');

    await deleteRefreshToken(savedRefreshToken.id);

    const result = await returnResponse({ user });

    return result;
  } catch (error) {
    throwError('Erro authenticate');
  }
};

export const oAuthGithub = async ({ requestToken }) => {
  try {
    const { access_token } = await githubCallback({ requestToken });
    const responseGithub = await getGithubUser({ access_token });
    const getUserDB = await findUserByGithubId(responseGithub.id.toString());

    if (!getUserDB)
      return {
        userId: responseGithub.id.toString(),
        message: 'User not found',
      };

    const result = await returnResponse({ user: getUserDB });

    return result;
  } catch (error) {
    throwError('Erro authenticate');
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
