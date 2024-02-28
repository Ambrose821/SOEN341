import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import  { useAuth } from '../apiServices/AuthContext';


const LoginPage = () => {
  
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const[isLoggedIn, setLoggedIn] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Email must follow the format joandoe@mail.co');
      return;
    }
    setEmailError('');
    
    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be between 8 and 16 characters, containing at least one lowercase letter, one uppercase letter, one digit, and one special character');
      return;
    }
    setPasswordError('');

    try {
      const response = await fetch('http://localhost:9000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data)
        throw new Error('Login failed');
      }

      login(data.accessToken);//using the loing function from AuthContext

      // Handle successful login response
     
      console.log('Login successful:', data);
      setLoggedIn(true);
      
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  if(isLoggedIn){
         
    return <Navigate to='/' replace ={true} />
    }
  
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Don't have an account yet? <b>Create an account</b></Link>
    </div>
  );

  }
export default LoginPage;
