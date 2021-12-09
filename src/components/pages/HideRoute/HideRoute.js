import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const HideRoute = ({ children }) => {
    const { user } = useAuth();
    return !user.email ? children : <Navigate to="/" /> 
};

export default HideRoute;