//App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import SelectTimePage from './SelectTimePage';
import Welcome from './Welcome';
import Favorite from './Favorite';
import PrivacyPolicy from './PrivacyPolicy'; 
import './App.css';

function App() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

  useEffect(() => {
    // Check if the user has completed setup
    const hasCompletedSetup = localStorage.getItem('hasCompletedSetup');
    if (hasCompletedSetup) {
      setIsFirstTimeUser(false);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect logic based on user status */}
          <Route
            path="/"
            element={
              isFirstTimeUser ? <Navigate to="/landing" /> : <Navigate to="/welcomep" />
            }
          />
          <Route path="/landing" element={<LandingPage />} />
          <Route
            path="/select-time"
            element={<SelectTimePage onComplete={() => {
              localStorage.setItem('hasCompletedSetup', 'true'); // if its a returning user they'll be directed to Welcome page
              setIsFirstTimeUser(false);
            }} />}
          />
          <Route path="/welcomep" element={<Welcome />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} /> {/* Corrected component name */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
