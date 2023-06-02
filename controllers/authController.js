const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync.js');

exports.signup = catchAsync(async (req, res, next) => {
  //   const newUser = await User.create(req.body);
  // only allow the data that we actually need
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});
