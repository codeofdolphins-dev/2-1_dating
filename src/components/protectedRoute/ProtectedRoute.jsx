// import React from "react";
// import { Navigate } from "react-router-dom";
// import { showErrorToast } from "../customToast/CustomToast";

// const ProtectedRoute = ({ children }) => {
//   const token = sessionStorage.getItem("jwtToken");

  
//   if (!token) {
//     showErrorToast("Token not found Please login")
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import React from "react";
import { Navigate } from "react-router-dom";
import { showErrorToast } from "../customToast/CustomToast";

const ProtectedRoute = ({ children }) => {
  // const token = sessionStorage.getItem("jwtToken");

  // if (!token) {
  //   showErrorToast("Token not found. Please login");
  //   return <Navigate to="/login" replace />;
  // }

  // try {
  //   const payload = JSON.parse(atob(token.split(".")[1]));
  //   const currentTime = Math.floor(Date.now() / 1000);

  //   console.log("payload",payload)

  //   if (payload.exp && payload.exp < currentTime) {
  //     alert("token xpired")
  //     showErrorToast("Session expired. Please login again");
  //     sessionStorage.removeItem("jwtToken"); // remove expired token
  //     return <Navigate to="/login" replace />;
  //   }
  // } catch (err) {
  //   showErrorToast("Invalid token. Please login again");
  //   sessionStorage.removeItem("jwtToken");
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

export default ProtectedRoute;
