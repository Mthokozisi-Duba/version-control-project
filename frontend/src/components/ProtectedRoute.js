/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React from 'react';
import { Navigate } from 'react-router-dom';
import { authApi } from '../api/authApi';

function ProtectedRoute({ children }) {
    const isAuthenticated = authApi.isAuthenticated();
    
    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }
    
    return children;
}

export default ProtectedRoute;
