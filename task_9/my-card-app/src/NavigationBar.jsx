import React from "react";
import { Outlet, Link } from "react-router-dom";
import './NavigationBar.css';

function NavigationBar() {
  return (
    <div className='navbar-div'>
      <Link className='link' to='/'>Home</Link>
      <Link className='link' to='/about'>About</Link>
      <Link className='link' to='/login'>Login</Link>
      <Link className='link' to='/post'>Post</Link>
      <Link className='link' to='/profile'>Profile</Link>
      <Outlet />
    </div>
  );
}

export default NavigationBar;
