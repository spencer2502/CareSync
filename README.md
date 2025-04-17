# CareSync API and Client

CareSync is a full-stack application for user authentication, email verification, and medical record management. It includes a backend API and a React-based frontend for user interaction.

## Features

### Backend

- User registration with hashed passwords.
- User login with JWT-based authentication.
- Email verification using OTP.
- Secure cookie-based session management.
- Logout functionality to clear user sessions.
- **Medical Record Management**:
  - Create and store medical records with file attachments.
  - Upload files to Cloudinary for secure storage.
- **Blockchain-based Audit Logging**:
  - Logs access events (view, update, share) to a blockchain stream for immutability.
  - Provides a secure and transparent way to track access to medical records.

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
- Cloudinary for file storage
- Multer for file uploads

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
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_SECRET_KEY=<your-cloudinary-secret-key>
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
│   ├── recordController.js # Medical record management logic
├── middleware/             # Backend middleware
│   ├── userAuth.js         # JWT-based authentication middleware
│   ├── multerMiddleware.js # File upload middleware
├── models/                 # Backend models
│   ├── userModel.js        # User schema definition
│   ├── recordModel.js      # Medical record schema definition
├── routes/                 # Backend routes
│   ├── authRoutes.js       # Authentication routes
│   ├── userRoutes.js       # User-related routes
├── server.js               # Main backend server file
└── README.md               # Project documentation
```

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

| Method | Endpoint           | Description                            | Authentication Required |
| ------ | ------------------ | -------------------------------------- | ----------------------- |
| GET    | `/data`            | Fetch user details                     | Yes                     |
| POST   | `/createNewRecord` | Create a new medical record            | Yes                     |
| GET    | `/getAllRequests`  | Fetch all access requests              | Yes                     |
| POST   | `/acceptRequest`   | Accept an access request               | Yes                     |
| GET    | `/getUserRecords`  | Fetch all records uploaded by the user | Yes                     |
| GET    | `/getRecord/:id`   | Fetch a specific record by ID          | Yes                     |

#### `/createNewRecord` Endpoint Details

- **Method**: `POST`
- **URL**: `/api/user/createNewRecord`
- **Authentication**: Required (JWT-based)
- **Description**: Creates a new medical record with optional file attachments.
- **Request Body**:
  ```json
  {
    "patientId": "string",
    "doctorId": "string",
    "recordType": "string",
    "title": "string",
    "description": "string",
    "isEmergencyAccessible": "boolean",
    "sharedWith": ["userId1", "userId2"]
  }
  ```
- **File Upload**: Accepts up to 5 files (via `multipart/form-data`).
- **Response**:
  - **Success**:
    ```json
    {
      "success": true,
      "message": "Record created successfully",
      "data": {
        "recordId": "string",
        "title": "string",
        "attachments": [
          {
            "fileUrl": "string",
            "fileName": "string"
          }
        ]
      }
    }
    ```
  - **Error**:
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

#### `/getUserRecords` Endpoint Details

- **Method**: `GET`
- **URL**: `/api/user/getUserRecords`
- **Authentication**: Required (JWT-based)
- **Description**: Fetches all medical records uploaded by the authenticated user.
- **Response**:
  - **Success**:
    ```json
    {
      "success": true,
      "records": [
        {
          "title": "string",
          "description": "string",
          "attachments": [
            {
              "fileUrl": "string",
              "fileName": "string"
            }
          ],
          "createdAt": "string"
        }
      ]
    }
    ```
  - **Error**:
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

#### `/getRecord/:id` Endpoint Details (User)

- **Method**: `GET`
- **URL**: `/api/user/getRecord/:id`
- **Authentication**: Required (JWT-based)
- **Description**: Fetches a specific medical record by its ID.
- **Response**:
  - **Success**:
    ```json
    {
      "success": true,
      "data": {
        "title": "string",
        "description": "string",
        "attachments": [
          {
            "fileUrl": "string",
            "fileName": "string"
          }
        ],
        "doctor": {
          "name": "string",
          "specialty": "string"
        }
      }
    }
    ```
  - **Error**:
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

#### `/acceptRequest` Endpoint Details

- **Method**: `POST`
- **URL**: `/api/user/acceptRequest`
- **Authentication**: Required (JWT-based)
- **Description**: Accepts an access request for a user's medical records.
- **Request Body**:
  ```json
  {
    "requestId": "string"
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "success": true,
      "message": "Request accepted"
    }
    ```
  - **Error**:
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

### Doctor Routes (`/api/doctor`)

| Method | Endpoint         | Description                        | Authentication Required |
| ------ | ---------------- | ---------------------------------- | ----------------------- |
| GET    | `/data`          | Fetch doctor details               | Yes                     |
| POST   | `/sendRequest`   | Send access request to a patient   | Yes                     |
| GET    | `/getAllRecords` | Fetch all approved access requests | Yes                     |
| GET    | `/getRecord/:id` | Fetch a specific record by ID      | Yes                     |

#### `/getAllRecords` Endpoint Details

- **Method**: `GET`
- **URL**: `/api/doctor/getAllRecords`
- **Authentication**: Required (JWT-based)
- **Description**: Fetches all approved access requests for the authenticated doctor.
- **Response**:
  - **Success**:
    ```json
    {
      "success": true,
      "records": [
        {
          "patient": {
            "name": "string",
            "email": "string"
          },
          "expiresAt": "string",
          "createdAt": "string"
        }
      ]
    }
    ```
  - **Error**:
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

#### `/getRecord/:id` Endpoint Details (Doctor)

- **Method**: `GET`
- **URL**: `/api/doctor/getRecord/:id`
- **Authentication**: Required (JWT-based)
- **Description**: Fetches a specific medical record by its ID for the authenticated doctor.
- **Response**:
  - **Success**:
    ```json
    {
      "success": true,
      "data": {
        "title": "string",
        "description": "string",
        "attachments": [
          {
            "fileUrl": "string",
            "fileName": "string"
          }
        ],
        "doctor": {
          "name": "string",
          "specialty": "string"
        }
      }
    }
    ```
  - **Error**:
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

### Audit Routes (`/api/audit`)

| Method | Endpoint | Description                     | Authentication Required |
| ------ | -------- | ------------------------------- | ----------------------- |
| GET    | `/logs`  | Fetch all blockchain audit logs | No                      |

#### `/logs` Endpoint Details

- **Method**: `GET`
- **URL**: `/api/audit/logs`
- **Authentication**: Not required
- **Description**: Fetches all access logs stored in the blockchain stream.
- **Response**:
  - **Success**:
    ```json
    [
      {
        "time": "2023-04-16T23:49:28.908Z",
        "userType": "doctor",
        "userId": "string",
        "recordId": "string",
        "action": "view"
      }
    ]
    ```
  - **Error**:
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

## Blockchain Integration

### Overview

CareSync uses a blockchain-based system to log access events for medical records. This ensures that all access logs are immutable and transparent. The blockchain stream is named `record-access`.

### Key Features

- **Stream Initialization**: The `record-access` stream is created and subscribed to during server setup.
- **Event Logging**: Access events (e.g., view, update, share) are logged with details such as user type, user ID, record ID, and action type.
- **Audit Viewer**: A Streamlit-based UI is available to view and filter blockchain logs.

### Stream Initialization

The blockchain stream is initialized using the `utils/createStream.js` script. This script creates the `record-access` stream and subscribes to it.

### Logging Access Events

Access events are logged using the `utils/blockchainLogger.js` utility. Each event includes the following details:

- **Time**: The timestamp of the event.
- **User Type**: The type of user (e.g., doctor, user).
- **User ID**: The ID of the user performing the action.
- **Record ID**: The ID of the accessed record.
- **Action**: The type of action performed (e.g., view, update, share).

### Viewing Logs

Logs can be viewed using the `/api/audit/logs` endpoint or the Streamlit-based UI (`utils/audit_viewer.py`).

#### Streamlit Audit Viewer

The Streamlit-based audit viewer provides a user-friendly interface to view and filter blockchain logs. It includes:

- **Filters**: Filter logs by user type and action type.
- **Detailed Log Cards**: Expandable cards for each log entry with detailed information.

To run the audit viewer:

1. Navigate to the `utils` directory.
2. Run the Streamlit app:
   ```bash
   streamlit run audit_viewer.py
   ```

## License

This project is licensed under the MIT License.
