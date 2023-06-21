export const sendRefreshToken = (res, token) => {
  res.cookies('refresh_token', token, {
    httpOnly: true,
    sameSite: true,
    path: '/api/v1/auth',
  });
};
