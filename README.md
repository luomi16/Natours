# Travel Website 🌍✈️

Welcome to the Travel Website repository! This is a travel website that offers various features and functionality to enhance users' travel experiences.

## Website Overview 📚🌟

The Travel Website showcases the following advantages and technical skills:

### Map-based Tour Display 🗺️📍

- The website leverages an interactive map to display the positions of various tours. Users can explore different destinations and easily locate available tours.

### User Reviews ✍️🌟

- Registered users can share their travel experiences by writing reviews and rating different tours. This feature allows others to benefit from real-life insights and recommendations.

### Tour Booking with Stripe Integration 💳💼

- The website enables users to book tours seamlessly by integrating Stripe payment processing. Users can securely make payments and receive booking confirmations.

### Email Notifications and JWT Cookies Authorization 📧🔒

- When users sign up on the website, they receive email notifications for successful registrations. Additionally, JWT cookies are utilized for secure authorization and authentication.

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

The Travel Website is deployed and accessible at [https://natours-miluo-a6134ef4d95c.herokuapp.com/](https://natours-miluo-a6134ef4d95c.herokuapp.com/). It is hosted on Heroku, a cloud platform that enables easy deployment and scaling of web applications. You can use test account to get guest functions(Email:aarav@example.com, Password:test1234)

## Technologies Used 💻🔧

The website is built using the following technologies and frameworks:

- **Backend**: Express, Node.js
- **Database**: MongoDB
- **Frontend**: HTML, CSS, JavaScript, Pug
- **Payment Integration**: Stripe

## Getting Started 🏁🔍

To run the Travel Website locally on your machine, follow these steps:

1. Clone the repository: `git clone [repository URL]`

2. Install the required dependencies by running the following command: [mention the command, such as `npm install`]

3. Set up the environment variables mentioned above, either by creating a `.env` file or using your preferred method.

4. Run the application using the command: [mention the command, such as `npm start`]

5. Access the website locally by visiting [http://localhost:3000] in your web browser.

## Contributing 🤝🌟

If you would like to contribute to the Travel Website, you are welcome to submit pull requests. Please follow these guidelines:

- Fork the repository and create a new branch for your contribution.

- Make your changes and test them thoroughly.

- Submit a pull request describing the changes you have made, along with any relevant information or context.

- Ensure your code follows best practices and is well-documented.

## Issues and Bug Reports 🐛📝

If you encounter any issues or bugs while using the Travel Website, please submit an issue on the GitHub repository. Provide detailed information about the problem, including steps to reproduce it, if possible.

## Contact 📞📧

If you have any questions, suggestions, or feedback, feel free to contact the project maintainer:

- [Mi Luo](luomi2001@gmail.com)

Thank you for visiting and using the Travel Website! We hope it enhances your travel experiences and inspires new adventures. ✈️🌟🗺️
