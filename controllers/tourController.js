const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync.js');
// const AppError = require('./../utils/appError.js');
const factory = require('./handlerFactory');

// p99
exports.aliasTopTours = (req, nes, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,-ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

// p101 aggregation pipeline
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: {
        ratingsAverage: { $gte: 4.5 }
        // secretTour: { $ne: true }
      }
    },
    {
      $group: {
        // _id: '$ratingsAverage',
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        // add 1 for each document
        numRatings: { $sum: 'ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

// p102 unwinding
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
        // filtering tours in this year
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        // convert month to number
        numTourStarts: { $sum: 1 },
        // calculating the number of tours starting in the month
        tours: { $push: '$name' }
        // get the name of tours
        // The $push operator appends a specified value to an array.
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: {
        _id: 0
      }
      // function: get rid of '_id'
      // $project : Passes along the documents with the requested fields to the next stage in the pipeline.
      // The specified fields can be existing fields from the input documents or newly computed fields.
      // _id: <0 or false> : Specifies the suppression of the _id field.
    },
    {
      $sort: { numTourStarts: -1 }
    },
    {
      $limit: 12
      // limit the number tour here
    }
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      plan
    }
  });
});
