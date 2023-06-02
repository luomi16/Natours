# Learning NodeJS, Express, MongoDB and more

## Configuration

To run this project, you need to set up the following environment variables in the `config.env` file:

### MongoDB Configuration

- `DATABASE`: The MongoDB connection string for ALias.
- `DATABASE_LOCAL`: The MongoDB connection string for the local development environment.
- `DATABASE_PASSWORD`: The password for the MongoDB database.

### JWT Configuration

- `JWT_SECRET`: The secret key used to sign JSON Web Tokens (JWTs).
- `JWT_EXPIRES_IN`: The expiration duration for JWTs. Example: `'90d'` (90 days).

### Nodemailer Configuration

- `EMAIL_USERNAME`: The email account username or email address used for sending emails.
- `EMAIL_PASSWORD`: The password or application-specific password for the email account.
- `EMAIL_HOST`: The SMTP server host for sending emails.
- `EMAIL_PORT`: The SMTP server port.

## How to Use

1. Clone this repository.
2. Install the dependencies by running `npm install` or `yarn install`.
3. Create a `config.env` file in the root directory of the project.
4. Define the required environment variables in the `config.env` file, following the provided configuration instructions.
5. Start the application by running `npm start` or `yarn start`.
6. The application will be accessible at `http://localhost:3000`.

## Contributing

Contributions in the form of pull requests or issue submissions are welcomed. We appreciate your valuable contributions to this project!
