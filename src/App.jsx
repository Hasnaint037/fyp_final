import React from 'react';
import Signup from './screeens/Signup';
import Login from './screeens/Login';
import Home from "./screeens/Home"
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/static/ProtectedRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
      </Routes>
    </div>
  )
}

export default App
