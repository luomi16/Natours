const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync.js');
// const AppError = require('./../utils/appError.js');
// const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently bookded tour
  const tour = await Tour.findById(req.params.tourId);
  console.log(tour);

  // 2) Create checkout seesion
  const session = await stripe.checkout.sessions.create({
    // payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/`,
    // cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    // customer_email: req.user.email,
    // client_reference_id: req.params.tourId,
    // line_items: [
    //   {
    //     name: `${tour.name} Tour`,
    //     description: tour.summary,
    //     images: [`https://www.natours.dev/img/tours/${tour.imagesCover}`],
    //     amount: tour.price * 100,
    //     currency: 'usd',
    //     quantity: 1
    //   }
    // ]
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imagesCover}`]
          },
          unit_amount: tour.price * 100
        },
        quantity: 1
      }
    ],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`
  });

  // 3) Create seesion as response
  res.status(200).json({
    status: 'success',
    session
  });
});
