import React, { useState } from 'react';
import Footer from '../Footer';
import Tweet from '../Components/Tweet';
import './Tweets.css';
import dummyTweets from '../static/dummyData';

const Tweets = () => {
  const [tweets, setTweets] = useState(dummyTweets);
  const [username, setUsername] = useState('Bob');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newTweet = {
      id: Date.now(),
      username,
      content: message,
      createdAt: new Date().toISOString(),
      picture: "https://randomuser.me/api/portraits/men/98.jpg"
    };

    setTweets([newTweet, ...tweets]);
    setMessage('');
  };

  return (
    <React.Fragment>
      <div className="tweetForm__container">
        <div className="tweetForm__wrapper">
          <div className="tweetForm__profile">
            <img src="https://randomuser.me/api/portraits/men/98.jpg" alt="profile" />
          </div>
          <div className="tweetForm__inputContainer">
            <form onSubmit={handleSubmit}>
              <div className="tweetForm__inputWrapper">
                <div className="tweetForm__input">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="your username here.."
                    className="tweetForm__input--username"
                    required
                  />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What's happening?"
                    className="tweetForm__input--message"
                    rows="3"
                    required
                  />
                </div>
                <div className="tweetForm__count" role="status">
                  <span className="tweetForm__count__text">
                    {`total: ${tweets.length}`}
                  </span>
                </div>
              </div>
              <div className="tweetForm__submit">
                <button
                  type="submit"
                  className="tweetForm__submitButton"
                >
                  Tweet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ul className="tweets">
        {tweets.map(tweet => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </ul>
      <Footer />
    </React.Fragment>
  );
};

export default Tweets;
