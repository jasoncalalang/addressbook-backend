# Address Book Backend

This is the backend codebase for the Address Book application, built with Node.js, Express, and MongoDB. The application provides a RESTful API for managing contacts, including creating, reading, updating, and deleting (CRUD) operations. Authentication is handled using IBM Cloud App ID.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local or hosted instance)
- [IBM Cloud Account](https://cloud.ibm.com/registration) with App ID service provisioned

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/address-book-backend.git
cd address-book-backend
```
2. **Install dependencies:**

```bash
npm install
```
## Configuration

### Environment Variables
Create a `.env` file in the root directory of the project and add the following environment variables:

```env
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
APPID_ISSUER=<your-appid-issuer-url>
APPID_AUDIENCE=<your-appid-client-id>
APPID_JWKS_URI=<your-appid-jwks-uri>
```

 - `MONGODB_URI`: Your MongoDB connection string.
 - `APPID_ISSUER`: The issuer URL from IBM App ID (found in the discovery endpoint).
 - `APPID_AUDIENCE`: Your App ID application client ID.
 - `APPID_JWKS_URI`: The JWKS URI for IBM App ID (also found in the discovery endpoint).

### IBM Cloud App ID Setup
1. **Create an App ID service instance:**
 - Log in to your IBM Cloud account.
 - Navigate to the App ID service.
 - Create a new App ID instance.

2. **Configure App ID for Backend:**
 - Go to your App ID service dashboard.
 - Navigate to Applications and create a new Regular Web Application.
 - Note down the Client ID and Discovery Endpoint.

3. **Obtain Configuration Values:**
 - Issuer URL: Found under the discovery endpoint at `issuer`.
 - JWKS URI: Found under the discovery endpoint at `jwks_uri`.


## Running the Application

Start the server with the following command:

```bash
npm start
```

The server will start on the port specified in the `.env` file (default is `5000`).

## API Endpoints

### Contacts

 - GET `/contacts`: Retrieve all contacts.
 - GET `/contacts/:id`: Retrieve a specific contact by ID.
 - POST `/contacts`: Create a new contact.
 - PUT `/contacts/:id`: Update an existing contact.
 - DELETE `/contacts/:id`: Delete a contact.

### Authentication Middleware

All /contacts endpoints are protected by JWT authentication using IBM App ID.


## Authentication

Authentication is handled via JWT tokens issued by IBM App ID. The backend verifies the tokens using the `express-jwt` and `jwks-rsa` libraries.

### Token Verification Middleware

```javascript
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const authMiddleware = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: process.env.APPID_JWKS_URI,
  }),
  audience: process.env.APPID_AUDIENCE,
  issuer: process.env.APPID_ISSUER,
  algorithms: ['RS256'],
});

module.exports = authMiddleware;
```

This middleware is applied to the `/contacts` routes to ensure that only authenticated users can access them.

## Error Handling

Errors are returned in JSON format with appropriate HTTP status codes.

 - `400 Bad Request`: Validation errors or malformed requests.
 - `401 Unauthorized`: Missing or invalid authentication token.
 - `404 Not Found`: Resource not found.
 - `500 Internal Server Error`: Server-side errors.

## Testing

To run tests, use the following command:

```bash
npm test
```

Ensure you have set up your testing environment and have any necessary test configurations in place.

## Deployment

For deployment to a production environment:
1. Set Environment Variables: Ensure all necessary environment variables are set in the production environment.
1. Use a Process Manager: Utilize a process manager like PM2 or forever to manage the application process.
1. Security Considerations:
 - Ensure HTTPS is used in production.
 - Validate all input data.
 - Keep dependencies up to date.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
1. Create a new feature branch: `git checkout -b feature/YourFeature`.
1. Commit your changes: `git commit -m 'Add some feature'`.
1. Push to the branch: `git push origin feature/YourFeature`.
1. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

If you have any questions or need further assistance, please contact the owner.
