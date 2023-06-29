export class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status ? status : 400;
    this.name = 'AppError';
  }
}
