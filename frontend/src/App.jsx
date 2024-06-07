import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.css';
import HomePage from './pages/Homepage';
import Navbar from './components/Navbar';
import Readinglist from './pages/ReadingList';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/readinglist" element={<Readinglist />} />
    </Routes>
  </>
);
export default App;
