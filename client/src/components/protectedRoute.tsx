
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: 'User' | 'Doctor'; // expected role
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // or fancy spinner
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />; // redirect to roles based login screens 
  }  

  if (user.role !== role) {
    // Redirect based on role
    if (user.role === 'User') return <Navigate to="/dashboard" replace />;
    if (user.role === 'Doctor')
      return <Navigate to="/doctor/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
