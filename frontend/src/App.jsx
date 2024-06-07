import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.css';
import HomePage from './pages/Homepage';
import Navbar from './components/Navbar';

const App = () => (
  <Routes>
    <Navbar />
    <Route path="/" element={HomePage} />
  </Routes>
);
export default App;
