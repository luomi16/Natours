class AppError extends Error {
  constructor(message, statusCode) {
    // calls the parent Error class constructor, setting the error message property
    super(message);
    this.statusCode = statusCode;
    // This is a common convention where 4xx status codes are considered client failures, and other status codes are treated as server errors.
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // This property is used to distinguish operational errors (such as invalid requests from clients) from programming errors (such as unhandled exceptions or bugs).
    this.isOperational = true;

    // captures the stack trace for the AppError instance, which helps in debugging by providing information about where the error occurred.
    Error.captureStackTrace(this, this.constructor);
  }
}

// exports the AppError class, making it available for use in other modules.
module.exports = AppError;
