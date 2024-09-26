import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom" // React Hooks
import Input from '../Input'
import '../App.css'
import '../Login.css'
import { signInwithGooglePopup, createUserDocFromAuth, signInUserWithEmailAndPassword } from '../utils/firebase'

const Login = (props)=>{

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

    // Create hook
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault(); // Stop page refresh
      try {
        const { email, password } = contact; 
        const { user } = await signInUserWithEmailAndPassword(email, password);
        console.log("User signed in:", user);
        navigate('/profile')
      } catch (error) {
        console.error("Error signing in:", error.message);
      }
    }

    const [contact, setContact] = useState({
      email: '',
      password: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      }
    })
  }

  return (
    <div className='login-container'>
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
    </div>
  );
}

export default Login