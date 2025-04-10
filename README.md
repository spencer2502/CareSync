# CareSync API and Client

CareSync is a full-stack application for user authentication and email verification. It includes a backend API and a React-based frontend for user interaction.

## Features

### Backend

- User registration with hashed passwords.
- User login with JWT-based authentication.
- Email verification using OTP.
- Secure cookie-based session management.
- Logout functionality to clear user sessions.

### Frontend

- Responsive UI built with React and TailwindCSS.
- User registration and login forms.
- Email verification page.
- Dynamic user data display on the home page.
- Toast notifications for user feedback.

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- Nodemailer for email services
- dotenv for environment variable management

### Frontend

- React.js
- React Router for navigation
- Axios for API requests
- React Toastify for notifications
- TailwindCSS for styling

## Setup Instructions

### Backend

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd CareSync
   ```

2. Install backend dependencies:

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

4. Start the backend server:

   ```bash
   npx nodemon
   ```

5. The backend server will run on `http://localhost:4000`.

### Frontend

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` directory and add the following environment variable:

   ```
   VITE_BACKEND_URL=http://localhost:4000
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

5. The frontend will run on `http://localhost:5173`.

## Folder Structure

```
CareSync/
├── client/                 # Frontend code
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Application context for state management
│   │   ├── pages/          # Application pages (Home, Login, EmailVerify)
│   │   ├── App.jsx         # Main application component
│   │   ├── main.jsx        # Entry point for React
│   │   ├── index.css       # Global styles
├── config/                 # Backend configuration
│   ├── mongodb.js          # MongoDB connection setup
│   ├── nodemailer.js       # Nodemailer configuration
├── controller/             # Backend controllers
│   ├── authController.js   # Authentication logic
│   ├── userController.js   # User-related logic
├── middleware/             # Backend middleware
│   ├── userAuth.js         # JWT-based authentication middleware
├── models/                 # Backend models
│   ├── userModel.js        # User schema definition
├── routes/                 # Backend routes
│   ├── authRoutes.js       # Authentication routes
│   ├── userRoutes.js       # User-related routes
├── server.js               # Main backend server file
└── README.md               # Project documentation
```

## UI Features

### Pages

1. **Home Page**: Displays a personalized greeting and user information.
2. **Login Page**: Allows users to log in or register.
3. **Email Verification Page**: Placeholder for email verification functionality.

### Components

- **Navbar**: Navigation bar with login/logout functionality.
- **Header**: Displays user-specific data and a welcome message.

### Context

- **AppContext**: Manages global state for user authentication and data.

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint           | Description                     | Authentication Required |
| ------ | ------------------ | ------------------------------- | ----------------------- |
| POST   | `/register`        | Register a new user             | No                      |
| POST   | `/login`           | Login an existing user          | No                      |
| POST   | `/logout`          | Logout the current user         | Yes                     |
| POST   | `/send-verify-otp` | Send OTP for email verification | Yes                     |
| POST   | `/verify-account`  | Verify email using OTP          | Yes                     |

### User Routes (`/api/user`)

| Method | Endpoint | Description        | Authentication Required |
| ------ | -------- | ------------------ | ----------------------- |
| GET    | `/data`  | Fetch user details | Yes                     |

## License

This project is licensed under the MIT License.
