import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"; // React Hooks
import Input from '../Input';
import '../App.css';
import '../Login.css';
import { signInwithGooglePopup, createUserDocFromAuth, signInUserWithEmailAndPassword, auth } from '../utils/firebase'; // Import Firebase Auth
import { getAuth } from 'firebase/auth';

const Login = () => {
  const [contact, setContact] = useState({
    email: '',
    password: ''
  });
  const [user, setUser] = useState(null); // Track the current user
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set the current user if logged in
    });
    return unsubscribe;
  }, []);

  const logGoogleUser = async () => {
    try {
      const { user } = await signInwithGooglePopup();
      await createUserDocFromAuth(user); 
      console.log("Google user signed in:", user);
      navigate('/profile');
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Stop page refresh
    try {
      const { email, password } = contact; 
      const { user } = await signInUserWithEmailAndPassword(email, password);
      console.log("User signed in:", user);
      navigate('/profile');
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUser(null); // Clear the user state after logout
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout Error:', error);
      });
  };

  return (
    <div className='login-container'>
      {user ? (
        // If user is logged in, show Logout button
        <>
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleLogout} className='login-button'>
            Log Out
          </button>
        </>
      ) : (
        // If no user, show login form
        <>
          <Input
            className='input-field'
            name='email'
            type='email'
            placeholder='Email'
            onChange={handleChange}
            value={contact.email}
          />
          <br />
          <Input
            className='input-field'
            name='password'
            type='password'
            placeholder='Password'
            onChange={handleChange}
            value={contact.password}
          />
          <br /><br />
          <button onClick={handleSubmit} className='login-button'>
            Log in
          </button>
          <br /><br />
          <button onClick={logGoogleUser} className='login-button-google'>
            Log in with Google
          </button>
          <br /><br />
          <Link to='/signup' className='sign-up-link'>
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};

export default Login;