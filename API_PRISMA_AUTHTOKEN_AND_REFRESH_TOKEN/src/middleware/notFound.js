export const notFound = (req, res, next) => {
  res.status(404);

  const error = new Error(`not Found - ${req.originalUrl}`);
  next(error);
};
