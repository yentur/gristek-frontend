import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/kurumsal-giris" replace />;
  }

  return children;
};

export default PrivateRoute;