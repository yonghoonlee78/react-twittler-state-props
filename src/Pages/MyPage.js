import React from 'react';
import Footer from '../Footer';
import Tweet from '../Components/Tweet';
import './MyPage.css';
import dummyTweets from '../static/dummyData';

const MyPage = () => {
  const filteredTweets = dummyTweets.filter(tweet => tweet.username === 'Bob');

  return (
    <section className="myInfo">
      <div className="myInfo__container">
        <div className="myInfo__wrapper">
          <div className="myInfo__profile">
            <img src={filteredTweets[0]?.picture} alt="Bob's profile" />
          </div>
          <div className="myInfo__detail">
            <p className="myInfo__detailName">Bob Profile</p>
            <p>28 팔로워 100 팔로잉</p>
          </div>
        </div>
      </div>
      <ul className="tweets__mypage">
        {filteredTweets.map(tweet => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </ul>
      <Footer />
    </section>
  );
};

export default MyPage;
