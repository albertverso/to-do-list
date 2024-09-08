import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from '../services/authService';

const ProtectedRoute = ({ children }) => {
  const isAuth = isAuthenticated();

  return isAuth ? children : <Navigate to="/Login" />;
};

export default ProtectedRoute;
