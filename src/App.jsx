import React from 'react';
import Signup from './screeens/Signup';
import Login from './screeens/Login';
import Home from "./screeens/Home"
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
    </div>
  )
}

export default App
