import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthGuard from './Components/AuthGuard';
import AuthComponent from './Components/AuthComponent';
import Apply from './Components/Pages/Apply';
import SignOut from './Components/Pages/SignOut';
import Dashboard from './Components/Pages/Dashboard';
import { getFirebaseInstance } from './Services/FirebaseService.js';
import Dues from './Components/Pages/Dues';
import ApplicationManager from './Components/Pages/ApplicationManager';
import ProfilePage from './Components/Pages/Profile';
import ChapterApplication from './Components/Pages/ChapterJoin';
import CreateChapterPage from './Components/Pages/CreateAChapter';
import ChapterLookup from './Components/Pages/ChapterLookup';
import AnnouncementsPage from './Components/Pages/AnnouncementsPage';
import ManageMembers from './Components/Pages/ManageAllMembers';
import CreateAnnouncementPage from './Components/Pages/PostAnnouncement';

const MainRoutes = ({ user, app, config }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<AuthComponent app={app} config={config} />}
      />
      <Route
        path="/apply"
        element={
          <AuthGuard user={user} item={config.items.apply}>
            <Apply />
          </AuthGuard>
        }
      />
      <Route
        path="/dues"
        element={
          <AuthGuard user={user} item={config.items.dues}>
            <Dues />
          </AuthGuard>
        }
      />
      <Route
        path="/applications"
        element={
          <AuthGuard user={user} item={config.items.applications}>
            <ApplicationManager />
          </AuthGuard>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthGuard user={user} item={config.items.profile}>
            <ProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path="/manage/members"
        element={
          <AuthGuard user={user} item={config.items.managemembers}>
            <ManageMembers />
          </AuthGuard>
        }
      />
      <Route
        path="/joinchapter"
        element={
          <AuthGuard user={user} item={config.items.joinchapter}>
            <ChapterApplication />
          </AuthGuard>
        }
      />
      <Route
        path="/acyunews/post"
        element={
          <AuthGuard user={user} item={config.items.postnews}>
            <CreateAnnouncementPage />
          </AuthGuard>
        }
      />
      <Route
        path="/createchapter"
        element={
          <AuthGuard user={user} item={config.items.createchapter}>
            <CreateChapterPage />
          </AuthGuard>
        }
      />
      <Route
        path="/chapterlookup"
        element={
          <AuthGuard user={user} item={config.items.chapterlookup}>
            <ChapterLookup />
          </AuthGuard>
        }
      />
      <Route
        path="/acyunews"
        element={
          <AuthGuard user={user} item={config.items.acyunews}>
            <AnnouncementsPage />
          </AuthGuard>
        }
      />
      <Route path="/signout" element={<SignOut firebaseApp={app} />} />
    </Routes>
  );
};


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const config = require('./config/items.json');

  return (
    <div className="App">
      <MainRoutes user={user} app={getFirebaseInstance()} config={config} />
    </div>
  );
};

export default App;
