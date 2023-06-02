const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// error handling middleware
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Cannot find ${req.originalUrl} on this server!!`
  // });

  // built-in error constructor
  // const err = new Error(`Cannot find ${req.originalUrl} on this server!!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err); // assume it's gonna a error,
  // // and then skip all the other midllewares in the middleware stack and sent the error that we passed in to our global error handling middleware

  // using appErrror class
  next(new AppError(`Cannot find ${req.originalUrl} on this server!!`));
});

// global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
