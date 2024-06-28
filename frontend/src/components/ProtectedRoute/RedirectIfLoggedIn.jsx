import React from 'react'
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function RedirectIfLoggedIn({ children }) {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  
    if (isLoggedIn) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  }

export default RedirectIfLoggedIn