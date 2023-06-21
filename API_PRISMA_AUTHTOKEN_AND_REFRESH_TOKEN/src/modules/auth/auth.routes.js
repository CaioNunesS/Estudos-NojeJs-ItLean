import { Router } from 'express';
import { validate } from '../../middleware/index.js';
import {
  create,
  login,
  refreshtoken,
  revokeRefrehTokens,
} from './auth.controller.js';

import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  revokeTokenSchema,
} from './auth.schema.js';

const authRoutes = Router();

authRoutes.post('/register', validate(registerSchema), create);
authRoutes.post('/login', validate(loginSchema), login);
authRoutes.post('/refresh-token', validate(refreshTokenSchema), refreshtoken);
authRoutes.post('/logout', validate(revokeTokenSchema), revokeRefrehTokens);

export default authRoutes;
