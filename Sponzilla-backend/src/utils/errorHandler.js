class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    error: message
  });
};

const sendSuccessResponse = (res, statusCode, data) => {
  res.status(statusCode).json({
    success: true,
    data
  });
};

module.exports = { AppError, sendErrorResponse, sendSuccessResponse };
