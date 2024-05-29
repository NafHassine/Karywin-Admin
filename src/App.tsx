import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from 'firebase/app';

import './App.css';

import SignIn from './pages/auth/sign-in';
import SignUp from './pages/auth/sign-up';
import Home from "./pages/dashboard/home";
import { firebaseConfig } from "./configs/firebase";
import BusList from "./pages/dashboard/bus-list";
import StationsList from "./pages/dashboard/stations-list";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routing */}
        <Route path="auth" element={<SignIn />} />
        <Route path="auth/signin" element={<SignIn />} />
        <Route path="auth/signup" element={<SignUp />} />

        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/bus-list" element={<BusList />} />
        <Route path="/station-list/:id" element={<StationsList />} />

        {/* <Route path="*" element={<div><h1>Bar nayek t5rach fih</h1></div>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
