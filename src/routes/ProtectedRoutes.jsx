import React from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const ProtectedRoute = ({ children }) => {
    const token = secureLocalStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
