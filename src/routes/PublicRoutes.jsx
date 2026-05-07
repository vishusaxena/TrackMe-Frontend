import React from 'react'
import { Navigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage'

const PublicRoutes = ({ children }) => {
    const token = secureLocalStorage.getItem("token");

    if (token) {
        return <Navigate to="/" replace />;
    }

    return children;
};


export default PublicRoutes