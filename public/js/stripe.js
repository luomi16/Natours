/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51NIxRqDcA8PQ9Eikkd2eS3zwsI6pnbBG2ASEI9USChCIEZe7tgUqAHlPvVyp8TgeG1OMwrjkNcRIrdh4urSkzexp00exDfHZ3n'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    // console.log(session);

    // 2)Create checkout form + charge credit card

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
