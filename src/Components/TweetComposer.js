import React, { useState } from 'react';
import './TweetComposer.css'; 

const TweetComposer = ({ onAddTweet }) => {
  const [tweetText, setTweetText] = useState('');
  const maxChars = 280; 

  const handleTweetChange = (e) => {
    setTweetText(e.target.value);
  };

  const handleSubmit = () => {
    if (tweetText.trim() && onAddTweet) {
      onAddTweet(tweetText); 
      setTweetText(''); 
    }
  };

  return (
    <div className="tweet-composer">
      <div className="user-info">
      <img src="https://randomuser.me/api/portraits/men/98.jpg" alt="Bob" className="profile-pic" />
        <span className="username">Bob</span>
      </div>
      <textarea
        placeholder="What's happening?"
        value={tweetText}
        onChange={handleTweetChange}
        maxLength={maxChars} 
      ></textarea>
      <div className="composer-actions">
        <span className="char-count">total: {tweetText.length}</span>
        <button onClick={handleSubmit} disabled={!tweetText.trim()}>Tweet</button>
      </div>
    </div>
  );
};

export default TweetComposer;