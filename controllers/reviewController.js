const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('./../utils/appError.js');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: reviews.length,
    data: {
      reviews
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  console.log(req.params.tourId);
  //   console.log(req.params.userId);
  console.log(req.user.id);

  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  const newReview = await Review.create(req.body);
  // Review.create(req.body) return a promise, and so we need to await that
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
