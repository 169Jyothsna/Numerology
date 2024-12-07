import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use Routes instead of Switch
import BirthChart from './components/BirthChart';
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<BirthChart />} /> {/* Replace Switch with Routes and use element prop */}
      </Routes>
    </Router>
  );
};

export default App;
