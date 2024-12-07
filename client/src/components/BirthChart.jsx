import React, { useState } from 'react';
import PDFGenerator from './PDFGenerator';
import './BirthChart.css';
import messages from '../data/messages.json';

const BirthChart = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [lifePathNumber, setLifePathNumber] = useState('');
  const [birthChart, setBirthChart] = useState({});
  const [isGenerated, setIsGenerated] = useState(false);
  const [birthChartMessages, setBirthChartMessages] = useState([]);

  const generateChart = () => {
    if (!name || !dob) {
      alert('Please enter both name and date of birth!');
      return;
    }

    const digits = dob.replace(/-/g, '').split('').map(Number);
    const sum = digits.reduce((acc, num) => acc + num, 0);
    let lifePath = sum;
    while (lifePath >= 10 && ![11, 22, 33].includes(lifePath)) {
      lifePath = lifePath
        .toString()
        .split('')
        .map(Number)
        .reduce((acc, num) => acc + num, 0);
    }
    setLifePathNumber(lifePath);

    const grid = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
    digits.forEach((digit) => {
      if (grid[digit] !== undefined) {
        grid[digit] += digit.toString();
      }
    });

    setBirthChart(grid);

    const messagesArray = Object.entries(grid)
      .filter(([key, value]) => value)
      .map(([key, value]) => {
        const numberMessages = messages[key] || {};
        const rawMessage = numberMessages[value.length] || `No message for ${key} with count ${value.length}`;
        return `${rawMessage.replace('[name]', name)}`;
      });

    setBirthChartMessages(messagesArray);

    const rawLifePathMessage = messages['lifePath'][lifePath] || 'Your Life Path number holds special significance.';
    const personalizedLifePathMessage = rawLifePathMessage.replace('[name]', name);

    setIsGenerated(true);
    console.log("Generated Birth Chart:", grid);
    console.log("Life Path Message:", personalizedLifePathMessage);
    console.log("Birth Chart Messages:", messagesArray);
  };

  const saveToDatabase = async () => {
    try {//pythagoras-numerology.vercel.app
      const response = await fetch('https://pythagoras-numerology/api/numerology/generate', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dob, lifePathNumber }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to save numerology data:', errorData);
        alert(errorData.error || 'An error occurred while saving data.');
      } else {
        const savedData = await response.json();
        console.log('Numerology data saved:', savedData);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to connect to the server.');
    }
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1>Pythagorean Numerology</h1>
      </header>
      <div className="form-section">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <button
          onClick={() => {
            generateChart();
            saveToDatabase();
          }}
        >
          Generate
        </button>
      </div>

      {isGenerated && (
        <div className="content-section">
          <h2>Ruling Number: {lifePathNumber}</h2>

          <h2>Birth Chart</h2>

          <div className="birth-chart">
            <div className="grid-row">
              <div className="grid-cell">{birthChart[3] || ''}</div>
              <div className="grid-cell">{birthChart[6] || ''}</div>
              <div className="grid-cell">{birthChart[9] || ''}</div>
            </div>
            <div className="grid-row">
              <div className="grid-cell">{birthChart[2] || ''}</div>
              <div className="grid-cell">{birthChart[5] || ''}</div>
              <div className="grid-cell">{birthChart[8] || ''}</div>
            </div>
            <div className="grid-row">
              <div className="grid-cell">{birthChart[1] || ''}</div>
              <div className="grid-cell">{birthChart[4] || ''}</div>
              <div className="grid-cell">{birthChart[7] || ''}</div>
            </div>
          </div>

          <div className="messages">
            <h3>Based on your Ruling Number,</h3>
            <p>{messages['lifePath'][lifePathNumber]?.replace('[name]', name) || 'Your Life Path number holds special significance.'}</p>

            <h3>The meaning of your unique birth chart,</h3>
            <ul>
              {birthChartMessages.map((message, index) => (
                <li key={`message-{index}`}>{message}</li>
              ))}
            </ul>
          </div>
          <PDFGenerator
            birthChart={birthChart}
            lifePathNumber={lifePathNumber}
            name={name}
            dob={dob}
            lifePathMessage={messages['lifePath'][lifePathNumber]?.replace('[name]', name) || 'Your Life Path number holds special significance.'}
            birthChartMessages={birthChartMessages}
          />
        </div>
      )}
    </div>
  );
};

export default BirthChart;
