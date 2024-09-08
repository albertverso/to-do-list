import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from '../services/authService';

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/Home" /> : children;
};

export default PublicRoute;
