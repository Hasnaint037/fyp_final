import React from 'react';
import Signup from './screeens/Signup';
import Login from './screeens/Login';
import Home from "./screeens/Home"
import Dashboard from './screeens/dashboard'
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/static/ProtectedRoute';
import Header from './components/static/Header';
import Footer from './components/static/Footer';
import Mens from './screeens/Mens';
import Womens from './screeens/Womens';
import Childrens from './screeens/Childrens';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path="/men" element={<ProtectedRoute><Mens /></ProtectedRoute>}></Route> <Route path="/women" element={<ProtectedRoute><Womens /></ProtectedRoute>}></Route> <Route path="/children" element={<ProtectedRoute><Childrens /></ProtectedRoute>}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
