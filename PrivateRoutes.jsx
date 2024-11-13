// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/authContext";

// const PrivateRoutes = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) return <div>Loading...</div>; // Wait until loading is done

//   return user ? children : <Navigate to="/login" />;
// };

// export default PrivateRoutes;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoutes = ({ children }) => {
  const { user } = useAuth();

  // Redirect to login if not authenticated
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
