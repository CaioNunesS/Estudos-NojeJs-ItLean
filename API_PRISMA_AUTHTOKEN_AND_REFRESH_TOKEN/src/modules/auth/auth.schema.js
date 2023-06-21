import { object, string } from 'zod';

export const registerSchema = object({
  body: object({
    email: string({
      required_error: 'email is required',
    }).email(),
    password: string({
      required_error: 'password is required',
    }).min(6, 'must be at least 6 character'),
  }),
});

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'email is required',
    }).email(),
    password: string({
      required_error: 'password is required',
    }).min(6, 'must be at least 6 character'),
  }),
});

export const refreshTokenSchema = object({
  body: object({
    refreshToken: string({
      required_error: 'refresh token is required',
    }),
  }),
});

export const revokeTokenSchema = object({
  body: object({
    userId: string({
      required_error: 'user id is required',
    }),
  }),
});