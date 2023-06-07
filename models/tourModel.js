const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    // the first object here is the schema definition
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal than 40 characters'],
      minlength: [10, 'A tour name must have more or equal than 10 characters']
      // external library usage:  validate: [validator.isAlpha, 'Tour must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          // this only points to current doc on NEW document creation
          return val < this.price; // 100 < 200
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    },
    // embedded data
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],
    //reference data
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// p103 virtual properities: business logic, is not stored in db (can be easily got from other properties that already exist in db)
// using real functions insteaf of arrow function because we need use 'this' keyword(pointing to th current document)
// cannot use this virtual property here in a query, because it's technically not part of db  × find({ durationWeek：5 })
tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// p155 review
// The virtual property allows you to define a relationship between the "tour" schema and another schema called "Review". It specifies that the "Review" schema is referenced by the "tour" schema using the 'tour' field in the "Review" schema and the '_id' field in the "tour" schema.
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});

// p104 document middleware
// middleware make something happen between two events
// (ex. each time a new document is saved to the db, we can run a command between the save command is issued and the actual saving)
// 4 types of middelware in Mongoose: document, query, aggregate, and model middleware

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function(next) {
  //   console.log(this);
  // 'this': print what our document is looking like right before it saved into db
  // so at this point of time, we can act on the data before it is then saved to db
  this.slug = slugify(this.name, { lower: true });
  next(); // to call next middleware
});
// tourSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });
// // callback function(doc,next) doc here is the document we just saved to db
// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// // embedded data
// tourSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// QUERY MIDDLEWARE：runs before or after a certain query is executed
// 'this' object points to the current query
tourSchema.pre(/^find/, function(next) {
  // tourSchema.pre('find', function(next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  // not in db
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  //   console.log(docs);
  next();
});

// when getting tour, populate tour using referencing guides data
tourSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt'
  });
  next();
});

// AGGREGATION MIDDLEWARE
// also need to exclude the secret tour from every (not just one) aggregation
tourSchema.pre('aggregate', function(next) {
  //   console.log(this.pipeline());
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  // add a field for pipeline using $match
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
