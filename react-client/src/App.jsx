import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./Pages/Global Components/Layout";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import LoginPage from "./Pages/login_page";
import { AuthProvider } from "./apiServices/AuthContext";



function App() {

  return (
    <Router>
      <AuthProvider>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;