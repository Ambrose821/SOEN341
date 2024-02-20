import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./Pages/Global Components/Layout";
import Home from "./Pages/Home";

import LoginPage from "./Pages/login_page";;
import SignUp from "./Pages/SignUp";


function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;