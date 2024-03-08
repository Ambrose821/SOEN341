import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./Pages/Global Components/Layout";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import LoginPage from "./Pages/login_page";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Careers from "./Pages/Careers";
import { AuthProvider } from "./apiServices/AuthContext";
import ProfileSettings from "./Pages/ProfileSettings";


function App() {

  return (
    <Router>
      <AuthProvider>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/careers" element={<Careers />} /> 
          <Route path="/profileSettings" element={<ProfileSettings />} /> 
        </Routes>
      </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;