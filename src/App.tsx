import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './features/currentUserSlice';
import { AppDispatch } from './app/store';
import SignOut from './pages/SignOut';
import AppBar from './components/AppBar';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <>
      <BrowserRouter>
        <AppBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/signout' element={<SignOut/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
