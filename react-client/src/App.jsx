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
import Reserve from "./Pages/Reserve";
import Reservations from "./Pages/Reservations";
import { AuthProvider } from "./apiServices/AuthContext";
import ProfileSettings from "./Pages/ProfileSettings";
import ViewUserReservations from './Pages/ViewUserReservations';
import AdminDashboard from "./Pages/AdminDashboard";
import Billing from "./Pages/Billing";
import InfoReservationPage from "./Pages/InfoReservePage";
import Stripe from "react-stripe-checkout";
import axios from 'axios';

function App() {

  const handleToken = (totalAmount, token) => {
    try {
      axios.post("http://localhost:3000/api/routes/stripe-routes/pay", {
        token: token.id,
        amount: totalAmount
      });
    } catch (error) {
      console.log(error);
    }
  };

const tokenHandler = (token) => {
  handleToken(100, token);
}


  return (
    <Router>
      <AuthProvider>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileSettings" element={<ProfileSettings/>} />   
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/careers" element={<Careers />} /> 
          <Route path="/viewuserreservations" element={<ViewUserReservations/>} /> 
          <Route path="/admindashboard" element={<AdminDashboard/>} /> 
          <Route path="/Reserve" element={<Reserve />} /> 
          <Route path="/Reservations" element={<Reservations />} /> 
          <Route path="/Billing" element={<Billing />} /> 
          <Route path="/InfoReserve" element={<InfoReservationPage />} /> 
          <Route path="/checkout" element={<Stripe stripeKey="pk_test_51OxClYRtB7HB3uoouoj90CHAzOKSboCFXA3j6SYsdDHW0N8In4m1ZfO9GZCG6jFOHedJNAMwF9DKZ8SEl0lbOqVv009DRKxgDw" token={tokenHandler} />} />

        </Routes>
      </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;