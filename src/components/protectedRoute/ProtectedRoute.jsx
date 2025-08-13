import React from "react";
import { Navigate } from "react-router-dom";
import { showErrorToast } from "../customToast/CustomToast";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("jwtToken");

  // If no token, redirect to login
  if (!token) {
    showErrorToast("Token not found Please login")
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
