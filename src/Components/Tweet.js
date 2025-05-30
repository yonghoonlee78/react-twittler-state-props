import React from 'react';
import './Tweet.css';

const Tweet = ({ tweet }) => {
  const parsedDate = new Date(tweet.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).replace(/ /g, ''); 

  return (
    <li className="tweet" id={tweet.id}>
      <div className="tweet__profile">
        <img src={tweet.picture} alt={`${tweet.username}의 프로필 사진`} />
      </div>
      <div className="tweet__content">
        <div className="tweet__userInfo">
          <span className="tweet__username">{tweet.username}</span>
          <span className="tweet__createdAt">{parsedDate}</span>
        </div>
        <div className="tweet__message">{tweet.content}</div>
      </div>
    </li>
  );
};

export default Tweet;
