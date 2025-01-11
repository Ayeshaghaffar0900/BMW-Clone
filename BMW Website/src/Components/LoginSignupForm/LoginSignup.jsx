
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './LoginSignup.css';
import DrawerAppBar from '../Navbar';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7klh0WHhK2XNYuDd8YVLVItwsMuuj4eY",
  authDomain: "my-todo-and-quiz.firebaseapp.com",
  databaseURL: "https://my-todo-and-quiz-default-rtdb.firebaseio.com",
  projectId: "my-todo-and-quiz",
  storageBucket: "my-todo-and-quiz.appspot.com",
  messagingSenderId: "293005200130",
  appId: "1:293005200130:web:5748a5cb773a090ec0501b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = () => {
    // Enable button only when all fields are filled
    if (isSignUp) {
      setIsButtonDisabled(!(name && email && password));
    } else {
      setIsButtonDisabled(!(email && password));
    }
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Sign-up successful! You can now log in.");
        setIsSignUp(false); // Switch to Login form
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login successful!");
        window.location = 'https://www.bmw.com/en/index.html'; // Navigate to dashboard
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button className={isSignUp ? 'active' : ''} onClick={() => setIsSignUp(true)}>
            Sign Up
          </button>
          <button className={!isSignUp ? 'active' : ''} onClick={() => setIsSignUp(false)}>
            Login
          </button>
        </div>
        <div className="form">
          <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
          {isSignUp && (
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleInputChange();
              }}
              required
            />
          )}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleInputChange();
            }}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleInputChange();
            }}
            required
          />
          {isSignUp ? (
            <button onClick={handleSignUp} disabled={isButtonDisabled}>
              Sign Up
            </button>
          ) : (
            <>
              <a href="#">Forgot Password?</a>
              <button onClick={handleLogin} disabled={isButtonDisabled}>
                Login
              </button>
            </>
          )}
          <p>
            {isSignUp
              ? "Already have an account? "
              : "Don't have an account? "}
            <a href="#" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Login here" : "Sign up here"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
