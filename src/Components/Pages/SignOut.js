import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function SignOut({ firebaseApp }) {
  useEffect(() => {
    firebaseApp.auth().signOut().then(() => {
      // console.log("User signed out successfully.");
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  }, [firebaseApp]);

  // Redirect to the '/' route
  return <Navigate to="/" />;
}

export default SignOut;
