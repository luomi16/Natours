const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures.js');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('./../utils/appError.js');

// p99
exports.aliasTopTours = (req, nes, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,-ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
  // execute query
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // creating an instance of this API features that will then get stored into features
  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
});
// One error might be the id cannot be parsed (500)
// test: 127.0.0.1:3000/api/v1/tours/647659bd32c49452300 show: "staus": "error", "message": "Cast to ObjectId failed for value \"647659bd32c49452300\" (type string) at path \"_id\" for model \"Tour\""
// Another error might be that id cannot be parsed, but there's no tour, it will be null (200 OK)
// test: 127.0.0.1:3000/api/v1/tours/647659bd32c494523009b7eb show: "status": "success","data": {"tour": null}
exports.getTour = catchAsync(async (req, res, next) => {
  // when getting tour, populate tour using referencing guides data
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return next(new AppError('No Tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  // Tour.create(req.body) return a promise, and so we need to await that
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
  // try {
  //   // const newTour = new Tour({})
  //   // newTour.save()
  // } catch (err) {
  //   res.status(400).json({
  //     status: 'fail',
  //     message: err
  //   });
  // }
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!tour) {
    return next(new AppError('No Tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError('No Tour found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

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
