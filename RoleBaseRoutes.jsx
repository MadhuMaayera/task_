// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/authContext";

// const RoleBaseRoutes = ({ children, requiredRole }) => {
//   const { user, loading } = useAuth();

//   if (loading) return <div>Loading...</div>;

//   if (!requiredRole.includes(user.role)) {
//     return <Navigate to="/unauthorized" />;
//   }
// return user ? children : <Navigate to="/login" />
// };

// export default RoleBaseRoutes;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user } = useAuth();

  // Check if user has required role
  if (!user || !requiredRole.includes(user.role)) {
    return <Navigate to="/login" />; // Redirect to login if role doesn't match
  }

  return children;
};

export default RoleBaseRoutes;
