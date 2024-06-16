import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

import './App.css';

import SignIn from './pages/auth/sign-in';
import SignUp from './pages/auth/sign-up';
import Home from "./pages/dashboard/home";
import { firebaseConfig } from "./configs/firebase";
import BusList from "./pages/dashboard/bus-list";
import StationsList from "./pages/dashboard/stations-list";
import UserList from "./pages/dashboard/user-list";
import { AuthProvider } from "./utils/AuthProvider";

// Initialize Firebase app
initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  // const { currentUser } = useAuth();

  useEffect(() => {
    const auth = async () => {
      const _auth = await getAuth();
      await onAuthStateChanged(_auth, (user) => {
        user && setUser(user);
        console.log(user);
        setLoading(false);
      });
    }
    auth()

  }, []);

  return (
    // <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Auth routing */}
        <Route path="auth" element={<SignIn />} />
        <Route path="auth/signin" element={<SignIn />} />
        <Route path="auth/signup" element={<SignUp />} />

        {/* If user is not authenticated, redirect to login */}
        {!user && !loading ? <Route path="*" element={<Navigate to="/auth/signin" />} /> :
          (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/bus-list" element={<BusList />} />
              <Route path="/stations/:region/:id" element={<StationsList />} />
              <Route path="/user-list" element={<UserList />} />
            </>
          )}

      </Routes>
    </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
