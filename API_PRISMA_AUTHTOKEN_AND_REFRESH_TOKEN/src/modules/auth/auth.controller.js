import {
  register,
  authenticatedUserByEmailAndPassword,
  refreshToken as refreshTokenService,
  revokeTokens,
} from './auth.service.js';

export const create = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await register({ email, password });

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authenticatedUserByEmailAndPassword({
      email,
      password,
    });

    return res.json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const refreshtoken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const result = await refreshTokenService({ refreshToken });

    return res.json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const revokeRefrehTokens = async (req, res) => {
  try {
    const { userId } = req.body;

    await revokeTokens(userId);

    return res.json({ message: `Tokens revoked for user with id #${userId}` });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
