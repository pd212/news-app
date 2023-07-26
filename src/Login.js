
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import Signup from './Signup';
import { doc,getDoc } from 'firebase/firestore';
import "./Login.css";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track successful login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setIsLoggedIn(true); // Set the state to true after successful login
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className='login'>
        {isLoggedIn ? (
        <div>
          <h2>Login Successful!</h2>
          <p>You have successfully logged in. You can now go to the home page.</p>
          <Link to="/">Go to Home</Link>
        </div>
      ) :(
      <div className='form'>
        <h2>Login</h2>
      <form className='form' onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <p>
        Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
      </div>
      )} 
    </div>
  );
};

export default Login;
