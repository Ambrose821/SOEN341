import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignedup, setSignup] = useState(false);

  const [generalError, setGeneralError] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // First name validation
    if (!firstName) {
      setFirstNameError("First name is required");
      return;
    }
    setFirstNameError("");

    // Last name validation
    if (!lastName) {
      setLastNameError("Last name is required");
      return;
    }
    setLastNameError("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Email must follow the format joandoe@mail.co");
      return;
    }
    setEmailError("");

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be between 8 and 16 characters, containing at least one lowercase letter, one uppercase letter, one digit, and one special character"
      );
      return;
    }
    setPasswordError("");

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    setConfirmPasswordError("");

    try {
      // Send signup data to backend
      const response = await fetch("http://localhost:9000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!response.ok) {
        const message = await response.json();
        setGeneralError(message.message);
        console.error("Signup failed" + message.message);
      }

      // Handle successful signup response
      const data = await response.json();
      console.log("Signup successful:", data.success);
      setSignup(true);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  if (isSignedup) {
    return <Navigate to="/login" replace />;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (isSignedup) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          {firstNameError && <p className="error">{firstNameError}</p>}
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={handleLastNameChange} />
          {lastNameError && <p className="error">{lastNameError}</p>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
            />
          </div>
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>
          {confirmPasswordError && (
            <p className="error">{confirmPasswordError}</p>
          )}
        </div>
        {generalError && <p className="error">{generalError}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login">
        Already have an account? <b>Sign in</b>
      </Link>
    </div>
  );
}

export default SignUp;
