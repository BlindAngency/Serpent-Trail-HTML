// Welcome.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { query, where} from 'firebase/firestore';
import { db } from './firebase';  // Import Firebase Firestore
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faHeart, faLink, faUserFriends, faHeadset, faFileAlt, faShieldAlt, faShare} from '@fortawesome/free-solid-svg-icons'; 
import { faListDots } from '@fortawesome/free-solid-svg-icons/faListDots';
import './App.css'; // Import your styles

const Welcome = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch quotes from Firestore
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'quotes')); 
        const fetchedQuotes = querySnapshot.docs.map(doc => doc.data());
        setQuotes(fetchedQuotes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        setLoading(false); // Ensure loading state is updated on error
      }
    };
    fetchQuotes();
  }, []);

  const handleSwipeUp = () => {
    setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % quotes.length);
  };

  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    if (touchStartY - touchEndY > 50) {
      handleSwipeUp();
    }
  };


  const handleFavorite = async () => {
    if (quotes.length === 0) return;
    const favoriteQuote = quotes[currentQuoteIndex];
    
    // Check if the quote already exists in favQuotes
    const favQuotesRef = collection(db, 'favQuotes');
    const q = query(favQuotesRef, where('text', '==', favoriteQuote.text));
    
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        alert('This quote is already in your favorites!');
        return;
      }
      
      await addDoc(favQuotesRef, favoriteQuote); // Add quote if it's not a duplicate
      alert('Quote added to favorites!');
    } catch (error) {
      console.error('Error adding favorite quote:', error);
    }
  };
  

  // Get the current quote's background image, text color, and author
  const currentBackgroundImage = quotes[currentQuoteIndex]?.backgroundImage || '';
  const currentTextColor = quotes[currentQuoteIndex]?.textColor || 'black'; // Default to black text if no textColor is defined
  const currentAuthor = quotes[currentQuoteIndex]?.author || 'Unknown Author'; // Default to 'Unknown Author'

  return (
    <div className="welcome-page" style={{ backgroundImage: `url(${currentBackgroundImage})` }}>
      <div className="header"></div>
      <div
        className="main-content"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="quote" style={{ color: currentTextColor }}> {/* Dynamically set text color */}
          <h1>{quotes[currentQuoteIndex]?.text || 'No quote text available'}</h1>
          <p className="author"> {currentAuthor}</p> {/* Add author below quote */}
        </div>
      </div>

      {/* Footer with icons */}
      <div className="welcome-footer">
        <button onClick={() => navigate('/welcomep')}>
          <FontAwesomeIcon icon={faHome} />
        </button>
        <button onClick={handleFavorite}>
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <button onClick={faShare}>
          <FontAwesomeIcon icon={faShare} />
        </button>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FontAwesomeIcon icon={faListDots} />
        </button>
      </div>

      {/* Drop-up Menu */}
      {isMenuOpen && (
        <div className="drop-up-menu">
          <button onClick={() => navigate('/favorite')}>
            <FontAwesomeIcon icon={faHeart}/>Favorites</button>
          <button onClick={() => navigate('/select-time')}>
            <FontAwesomeIcon icon={faBell}/>Notifications</button>
            <button onClick={() => window.open('https://branham.org/articles/8152019_TheTableDesktopApp', '_blank')}>
            <FontAwesomeIcon icon={faLink} />The Table App</button>
            <button onClick={() => {
            if (navigator.share) {
            navigator.share({
             title: 'God bless you!',
             text: 'Check out The Message of the Hour Quotes app:',
             url: 'https://yourapp.com', 
            })
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.log('Error sharing', error));
          } else {
          alert('Sharing is not supported on this browser.');
          }
          }}><FontAwesomeIcon icon={faUserFriends} /> Invite a Friend </button>

          <button onClick={() => {window.location.href = "mailto:support@serpenttrail.org?subject=Support Inquiry&body=Hello, I need assistance with...";}}>
            <FontAwesomeIcon icon={faHeadset}/>Contact Support</button>

          <button onClick={() => navigate('/terms-and-conditions')}>
            <FontAwesomeIcon icon={faFileAlt}/>Terms and Conditions</button>
          <button onClick={() => navigate('/privacypolicy')}>
            <FontAwesomeIcon icon={faShieldAlt}/>Privacy Policy</button>
        </div>
      )}
    </div>
  );
};

export default Welcome;

