import React, { useState } from 'react'
import {Link} from "react-router-dom"
import Input from '../Input'
import '../App.css'
import '../Signup.css'
import { createAuthUserWithEmailandPassword, createUserDocFromAuth } from '../utils/firebase'

const Signup = (props) => {

  const [contact, setContact] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const {displayName, email, password, confirmPassword} = contact

  console.log(contact);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      }
    })
  }
  const handleSubmit = async(event) =>
  {
    event.preventDefault();

    // Check password match
    if (password !== confirmPassword){
      alert('Passwords do not match!')
      return;
    }

    try{
      // const response = await createAuthUserWithEmailandPassword(email, password)
      // console.log(response)
      const {user} = await createAuthUserWithEmailandPassword(email, password)
      await createUserDocFromAuth (user, {displayName});
    }
    catch(error){
      console.log('Error Creating User', error.message)
    }
  }

  return (
    <div className='login-container'>
      <Input
        className='input-field'
        name='displayName'
        type='text'
        placeholder='Display Name'
        onChange={handleChange}
        value={contact.displayName}
      />
      <br />
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
      <br />
      <Input
        className='input-field'
        name='confirmPassword'
        type='password'
        placeholder='Confirm Password'
        onChange={handleChange}
        value={contact.confirmPassword}
      />
      <br /><br />
      <button onClick={handleSubmit} className='signup-button'>
        Sign up
      </button>
      <br /><br />
      <Link to='/login' className='login-link'>
        Log in
      </Link>
    </div>
  );
}

export default Signup