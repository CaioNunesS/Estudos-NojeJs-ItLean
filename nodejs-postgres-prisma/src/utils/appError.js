export const AppError = (status, message) => {
  const error = new Error(message);

  error.name = 'AppError';
  error.data = {
    status,
    message,
  };

  return error;
};
