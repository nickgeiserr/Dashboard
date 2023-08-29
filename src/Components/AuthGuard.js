import React from 'react';
import { Navigate } from 'react-router-dom';
import firebase from "firebase/compat/app";
import { b_CanUserAccessPage } from '../Services/FirebaseService.js';

const AuthGuard = ({ children, user, config }) => {
  if(user === null) {
    return <Navigate to="/"/>;
  }
  if (b_CanUserAccessPage(user.uid,config)) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default AuthGuard;
