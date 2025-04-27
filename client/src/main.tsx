import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import React from 'react';
import './index.css';

import { UserContextProvider } from './context/userContext.tsx';
import { AuthProvider } from './context/authContext.tsx';
import { AppContextProvider } from './context/appContext.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
