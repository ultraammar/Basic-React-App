import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true'? true: false;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  else{
    return children;
  }

};
export default ProtectedRoute;