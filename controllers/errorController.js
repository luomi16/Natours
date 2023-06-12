const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: /name: ${value}/. Please use another value!`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('.         ')}`;
  return new AppError(message, 400);
};
const handleJWTError = () => new AppError('Invalid token. Please login again', 401);
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, req, res) => {
  // a) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }
  // b) rendered website
  console.error('ERROR 💥!!', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message
  });
};

const sendErrorProd = (err, req, res) => {
  // a) API
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        staus: err.status,
        message: err.message
      });
    }
    // Programming or other unknow error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥!!', err);
    // 2) Send genric message
    return res.status(500).json({
      staus: 'error',
      message: 'Something went very wrong! (in production)'
    });
  }
  // b) render website
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message
    });
    // Programming or other unknow error: don't leak error details
  }
  // 1) Log error
  console.error('ERROR 💥!!', err);
  // 2) Send genric message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'please try again later'
  });
};

module.exports = (err, req, res, next) => {
  //   console.log(err.stack);
  // Set default values(500: Internal Server Error) for statusCode and status properties('error) of the error object
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  //p117 errors during different env
  if (process.env.NODE_ENV === 'development') {
    // Send JSON response with the error status code and message
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err, name: err.name, code: err.code };
    error.message = err.message;
    // console.log(err);
    // console.log(error);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
