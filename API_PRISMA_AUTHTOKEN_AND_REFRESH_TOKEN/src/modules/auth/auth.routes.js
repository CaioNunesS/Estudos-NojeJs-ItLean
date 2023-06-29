import { Router } from 'express';
import { validate, asyncWrapper } from '../../middleware/index.js';
import {
  create,
  login,
  refreshtoken,
  revokeRefrehTokens,
  completeRegister,
  loginGithub,
} from './auth.controller.js';

import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  revokeTokenSchema,
  registerCompleteSchema,
} from './auth.schema.js';

const authRoutes = Router();

authRoutes.post('/register', validate(registerSchema), asyncWrapper(create));
authRoutes.post(
  '/register-complete',
  validate(registerCompleteSchema),
  asyncWrapper(completeRegister)
);
authRoutes.post('/login', validate(loginSchema), asyncWrapper(login));
authRoutes.post(
  '/refresh-token',
  validate(refreshTokenSchema),
  asyncWrapper(refreshtoken)
);
authRoutes.post(
  '/logout',
  validate(revokeTokenSchema),
  asyncWrapper(revokeRefrehTokens)
);
authRoutes.get('/github/callback', asyncWrapper(loginGithub));

export default authRoutes;
