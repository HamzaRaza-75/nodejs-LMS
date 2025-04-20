class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Data not found') {
    super(404, message);
  }
}

class InvalidTokenError extends AppError {
  constructor(message = 'Invalid token') {
    super(401, message);
  }
}

module.exports = {
  AppError,
  UnauthorizedError,
  NotFoundError,
  InvalidTokenError,
};
