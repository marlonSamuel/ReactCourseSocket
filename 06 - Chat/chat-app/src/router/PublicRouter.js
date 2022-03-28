import React from 'react'
import { Navigate, Route } from 'react-router-dom'

export const PublicRouter = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/auth/login" />;
};
