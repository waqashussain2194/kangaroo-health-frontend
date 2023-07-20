import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ isSignedIn, children }: any) => {
  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }
  return children
};

export default PrivateRoute;
