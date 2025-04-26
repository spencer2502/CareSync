import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import React from 'react';
import './index.css';

import { UserContextProvider } from './context/userContext.tsx';
import { AuthProvider } from './context/authContext.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
