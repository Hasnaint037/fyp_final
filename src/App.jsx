import React from 'react';
import Signup from './screeens/Signup';
import Login from './screeens/Login';
import Home from "./screeens/Home"
import Dashboard from './screeens/dashboard'
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/static/ProtectedRoute';
import Header from './components/static/Header';
import Footer from './components/static/Footer';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
