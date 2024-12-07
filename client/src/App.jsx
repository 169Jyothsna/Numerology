import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BirthChart from './components/BirthChart';
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<BirthChart />} /> 
      </Routes>
    </Router>
  );
};

export default App;
