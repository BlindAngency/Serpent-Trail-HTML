//SelectTime.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase'; // Import Firebase Firestore


const SelectTimePage = ({ userId }) => {
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const preferredTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    // Save the preferred time to Firestore for the current user
    try {
      const userRef = doc(db, 'users', userId); // Assume userId is passed as a prop or from auth context
      await updateDoc(userRef, { preferredTime });
      alert(`Preferred notification time saved: ${preferredTime}`);
    } catch (error) {
      console.error('Error saving preferred time:', error);
    }

    navigate('/welcomep');
  };

  const incrementHours = () => setHours((prev) => (prev < 23 ? prev + 1 : 0));
  const decrementHours = () => setHours((prev) => (prev > 0 ? prev - 1 : 23));
  const incrementMinutes = () => setMinutes((prev) => (prev < 59 ? prev + 1 : 0));
  const decrementMinutes = () => setMinutes((prev) => (prev > 0 ? prev - 1 : 59));

  return (
    <div className="select-time-page">
      <div className="header">
        <h2>Select Your Preferred</h2>
        <h2>Notification Time</h2>
      </div>
      <div className="main-content">
        <form onSubmit={handleSubmit}>
          <div className="time-picker">
            <div className="time-control">
              <button type="button" onClick={incrementHours}>+</button>
              <span>{hours.toString().padStart(2, '0')}</span>
              <button type="button" onClick={decrementHours}>-</button>
            </div>
            <span>:</span>
            <div className="time-control">
              <button type="button" onClick={incrementMinutes}>+</button>
              <span>{minutes.toString().padStart(2, '0')}</span>
              <button type="button" onClick={decrementMinutes}>-</button>
            </div>
          </div>
        </form>
      </div>
      <div className="footer">
        <button type="submit" onClick={handleSubmit}>SUBMIT</button>
      </div>
    </div>
  );
};

export default SelectTimePage;
