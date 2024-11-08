//Favorite.js 
import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faHeart, faTrashAlt, faListDots, faFileAlt, faShieldAlt, faHeadset, faLink, faUserFriends, faShare} from '@fortawesome/free-solid-svg-icons';
import './App.css';

const Favorite = () => {
  const [favQuotes, setFavQuotes] = useState([]); // Store favorite quotes
  const [currentFavQuoteIndex, setCurrentFavQuoteIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [touchStartY, setTouchStartY] = useState(0);


  // Fetch favorite quotes from Firestore on component mount
  useEffect(() => {
    const fetchFavQuotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'favQuotes'));
        const fetchedFavQuotes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFavQuotes(fetchedFavQuotes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favorite quotes:', error);
      }
    };
    fetchFavQuotes();
  }, []);

  const handleSwipeUp = () => {
    setCurrentFavQuoteIndex((prevIndex) => (prevIndex + 1) % favQuotes.length);
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


  if (loading) {
    return <div>Loading favorite quotes...</div>;
  }

  if (favQuotes.length === 0) {
    return <div>No favorite quotes available.</div>;
  }

  const currentQuote = favQuotes[currentFavQuoteIndex];
  const currentBackgroundImage = currentQuote.backgroundImage || '';
  const currentTextColor = currentQuote.textColor || 'black';
  const currentAuthor = currentQuote.author || 'Unknown Author';

  return (
    <div className="favorite-quotes" style={{ backgroundImage: `url(${currentBackgroundImage})` }}>
      <div className="header"></div>
      <div className="main-content"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}>
        <div className="favQuotes" style={{ color: currentTextColor }}>
          <h1>{currentQuote.text}</h1>
          <p className="author">{currentAuthor}</p>
        </div>
      </div>

      /*
      {/* Navigation Controls 
      <div className="nav-controls">
        <button onClick={handlePreviousQuote}>Previous</button>
        <button onClick={handleNextQuote}>Next</button>
      </div>*/}

      {/* Footer with icons */}
      <div className="favQ-footer">
        <button onClick={() => navigate('/welcomep')}>
          <FontAwesomeIcon icon={faHome} />
        </button>
        <button onClick={() => navigate('/select-time')}>
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button onClick={faShare}>
          <FontAwesomeIcon icon={faShare}/>
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
          <button onClick={() => {window.location.href="mailto: support@serpenttrail.org?subject=Support Enquiry&body=God bless, I need assistance with..."}}> 
           <FontAwesomeIcon icon={faHeadset} />Contact Support
          </button>
          <button onClick={() => navigate('/terms-and-conditions')}>
            <FontAwesomeIcon icon={faFileAlt}/>Terms and Conditions</button>
          <button onClick={() => navigate('/privacypolicy')}>
            <FontAwesomeIcon icon={faShieldAlt}/>Privacy Policy</button>
        </div>
      )}
    </div>
  );
};

export default Favorite;
