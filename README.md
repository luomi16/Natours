## Travel Website 🌍✈️

A Travel Website is a feature-rich online platform offering interactive maps for tour locations, user reviews, secure tour booking with Stripe integration, email notifications, JWT cookies authorization, and it's built with technologies like Express, Node.js, MongoDB, and Stripe, deployable on Heroku.

## Getting Started 🏁🔍

To run the Travel Website locally on your machine, follow these steps:

1. Clone the repository: `git clone [repository URL]`

2. Install the required dependencies by running the following command: [mention the command, such as `npm install`]

3. Set up the environment variables mentioned above, either by creating a `.env` file or using your preferred method.

4. Run the application using the command: [mention the command, such as `npm start`]

5. Access the website locally by visiting [http://localhost:3000] in your web browser.

## Screenshots 📸🖼️

Here are some screenshots of the Travel Website:

![Screenshot 1](/public/img/readme/index.png)
_Caption: Map view displaying tour positions._

![Screenshot 2](/public/img/readme/details.png)
_Caption: User reviews section with ratings._

![Screenshot 3](/public/img/readme/payment.png)
_Caption: Tour booking page with Stripe integration._

![Screenshot 4](/public/img/readme/accountpage.png)
_Caption: User page providing update individual info functions._

## Environment Variables 🌐🔧

In order to run the Travel Website locally or in a production environment, you will need to set up the following environment variables:

- **NODE_ENV**: Set this variable to `development` for local development.

- **PORT**: The port number on which the server will run. Set it to `3000` for local development.

- **DATABASE**: The connection URL for the MongoDB database. For example: `mongodb+srv://ZheLi:<PASSWORD>@clusteretryWrites=true&w=majority`.

- **DATABASE_LOCAL**: The connection URL for the local MongoDB database. For example: `mongodb://localhost:27017`.

- **DATABASE_PASSWORD**: The password for the MongoDB database user.

- **JWT_SECRET**: A secret key used for JWT token generation and verification.

- **JWT_EXPIRES_IN**: The expiration duration for JWT tokens. For example: `90d` for 90 days.

- **JWT_COOKIE_EXPIRES_IN**: The expiration duration for JWT cookies. For example: `90` for 90 days.

- **EMAIL_USERNAME**: The username for your email provider (e.g., Mailtrap).

- **EMAIL_PASSWORD**: The password for your email provider.

- **EMAIL_HOST**: The SMTP host for your email provider. For example: `sandbox.smtp.mailtrap.io`.

- **EMAIL_PORT**: The SMTP port for your email provider. For example: `25`.

- **EMAIL_FROM**: The email address from which emails will be sent (e.g., `ZHELI@gmail.com`).

- **STRIPE_SECRET_KEY**: Your Stripe secret key for payment integration.

Make sure to set up these environment variables correctly before running the application.

## Deployment 🚀

The Travel Website is deployed and accessible at [https://natours-miluo-a6134ef4d95c.herokuapp.com/](https://natours-miluo-a6134ef4d95c.herokuapp.com/)(Sorry, no longer accessible). It is hosted on Heroku, a cloud platform that enables easy deployment and scaling of web applications. You can use test account to get guest functions(Email:aarav@example.com, Password:test1234)

## Technologies Used 💻🔧

The website is built using the following technologies and frameworks:

- **Backend**: Express, Node.js
- **Database**: MongoDB
- **Frontend**: HTML, CSS, JavaScript, Pug
- **Payment Integration**: Stripe

Thank you for visiting and using the Travel Website! We hope it enhances your travel experiences and inspires new adventures. ✈️🌟🗺️
