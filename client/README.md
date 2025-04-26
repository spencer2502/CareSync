Welcome To CareSync User Portal

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- **Vite**: Fast build tool for modern web applications.
- **TypeScript**: Strongly typed JavaScript for better development experience.
- **React**: Component-based UI library.
- **shadcn-ui**: Prebuilt UI components for React.
- **Tailwind CSS**: Utility-first CSS framework for styling.

---

## Frontend Structure

### Folder Structure

```
client/
├── src/
│   ├── components/         # Reusable UI components
│   ├── context/            # Context for state management
│   ├── pages/              # Application pages (User and Doctor)
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Entry point for React
│   ├── index.css           # Global styles
```

### Flow Overview

1. **Splash Screen**:

   - Entry point for the application.
   - Provides options for patient and doctor login.

2. **Authentication**:

   - Separate login and registration pages for patients and doctors.
   - OTP verification for account activation.

3. **Dashboard**:

   - Role-specific dashboards for patients and doctors.
   - Displays relevant actions and recent activity.

4. **Document Management**:

   - Patients can upload, view, and manage their medical records.
   - Doctors can request access to patient records and review them.

5. **Help Center**:
   - Dedicated help pages for patients and doctors with FAQs and resources.

---

## Role-Based Pages

### Patient Pages

| Path                 | Description                       |
| -------------------- | --------------------------------- |
| `/`                  | Splash screen with login options  |
| `/login`             | Patient login page                |
| `/register`          | Patient registration page         |
| `/verify`            | OTP verification for patients     |
| `/dashboard`         | Patient dashboard                 |
| `/upload`            | Upload new medical records        |
| `/qr-code`           | Generate emergency QR code        |
| `/history`           | View document history             |
| `/document/:id`      | View a specific document          |
| `/hospitals`         | Find nearby hospitals             |
| `/help`              | Patient help center               |
| `/approval-requests` | View and manage approval requests |

### Doctor Pages

| Path                       | Description                       |
| -------------------------- | --------------------------------- |
| `/doctor/login`            | Doctor login page                 |
| `/doctor/verify`           | OTP verification for doctors      |
| `/doctor/dashboard`        | Doctor dashboard                  |
| `/doctor/patients`         | View list of assigned patients    |
| `/doctor/patients/:id`     | View a specific patient's profile |
| `/doctor/request-document` | Request documents from patients   |
| `/doctor/document-history` | View document access history      |
| `/doctor/help`             | Doctor help center                |

---

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/89590b3f-c043-4bdf-a3ef-b601270caad8) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
