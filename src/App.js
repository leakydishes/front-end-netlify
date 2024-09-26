import React from 'react';
import './App.css';
import HomePage from './routes/HomePage.jsx';
import AboutPage from './routes/AboutPage';
import {Routes, Route} from 'react-router-dom'
import NavFooter from './NavFooter'
import ConnectPage from './routes/ConnectPage'
import Signup from './routes/Signup.jsx';
import Login from './routes/Login.jsx';
import Profile from './routes/Profile.jsx';
import PostPage from './routes/PostPage.jsx';
import 'semantic-ui-css/semantic.min.css';

function App() {
  
  return (
  <Routes>
  <Route path='/' element={<NavFooter />}>
  <Route index element={<HomePage />}/>
  <Route path='about' element= {<AboutPage />}/>
  <Route path='post' element= {<PostPage />}/>
  <Route path='connect' element= {<ConnectPage />}/>
  <Route path='login' element= {<Login />}/>
  <Route path='signup' element= {<Signup />}/>
  <Route path='profile' element= {<Profile />}/>
  </Route>
  </Routes>
  
  
  );
}

export default App;


