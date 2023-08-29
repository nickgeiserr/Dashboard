import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import SignInOut from './Pages/SignInOut.js';
import Dashboard from './Pages/Dashboard.js';
import { getAuthInstance } from '../Services/FirebaseService.js';

const AuthComponent = ({ app, config }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = getAuthInstance().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    return null;
  }

  return (
    <div>
      {user ? <Dashboard firebaseApp={app} config={config} /> : <SignInOut firebaseApp={app} />}
    </div>
  );
};

export default AuthComponent;
