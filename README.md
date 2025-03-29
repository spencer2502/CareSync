# CareSync API

CareSync is a backend API for user authentication and email verification. It provides endpoints for user registration, login, logout, and email verification using OTP.

## Features

- User registration with hashed passwords.
- User login with JWT-based authentication.
- Email verification using OTP.
- Secure cookie-based session management.
- Logout functionality to clear user sessions.

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- Nodemailer for email services
- dotenv for environment variable management

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd CareSync
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```
   PORT=4000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   SMTP_USER=<your-smtp-user>
   SMTP_PASS=<your-smtp-password>
   SENDER_EMAIL=<your-sender-email>
   NODE_ENV=development
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. The server will run on `http://localhost:4000`.

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint           | Description                     | Authentication Required |
| ------ | ------------------ | ------------------------------- | ----------------------- |
| POST   | `/register`        | Register a new user             | No                      |
| POST   | `/login`           | Login an existing user          | No                      |
| POST   | `/logout`          | Logout the current user         | Yes                     |
| POST   | `/send-verify-otp` | Send OTP for email verification | Yes                     |
| POST   | `/verify-account`  | Verify email using OTP          | Yes                     |

### Request and Response Examples

#### 1. Register a User

**POST** `/api/auth/register`

```json
Request Body:
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}

Response:
{
  "message": "User registered successfully",
  "token": "<jwt-token>"
}
```

#### 2. Login a User

**POST** `/api/auth/login`

```json
Request Body:
{
  "email": "john.doe@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "<jwt-token>"
}
```

#### 3. Logout a User

**POST** `/api/auth/logout`

```json
Response:
{
  "message": "Logout successful"
}
```

#### 4. Send Verify OTP

**POST** `/api/auth/send-verify-otp`

```json
Request Body:
{
  "userId": "<user-id>"
}

Response:
{
  "success": true,
  "message": "OTP sent successfully"
}
```

#### 5. Verify Email

**POST** `/api/auth/verify-account`

```json
Request Body:
{
  "userId": "<user-id>",
  "otp": "123456"
}

Response:
{
  "message": "Email verified successfully"
}
```

## Folder Structure

```
CareSync/
├── config/
│   ├── mongodb.js          # MongoDB connection setup
│   ├── nodemailer.js       # Nodemailer configuration
├── controller/
│   ├── authController.js   # Authentication logic
├── middleware/
│   ├── userAuth.js         # JWT-based authentication middleware
├── models/
│   ├── userModel.js        # User schema definition
├── routes/
│   ├── authRoutes.js       # Authentication routes
├── server.js               # Main server file
└── README.md               # Project documentation
```

## License

This project is licensed under the MIT License.
