import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    // If there is no token, redirect to the login page (root path)
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // If token exists, render the children components (Sidebar, Dashboard, etc.)
    return children;
};

export default ProtectedRoute;