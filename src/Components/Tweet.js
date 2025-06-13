
import React from 'react';
import './Tweet.css'; 

function Tweet({ user, content, date, createdAt }) { 

  if (!user || !user.name || !content || !date || !createdAt) {
      console.error("Tweet component received incomplete or invalid props:", { user, content, date, createdAt });
      return null;
  }

  return (
    <div className="tweet">
      <div className="tweet__avatar-container">
        {user.profilePic && <img src={user.profilePic} alt={user.name} className="tweet__profile-pic" />}
      </div>
      <div className="tweet__main-content">
        <div className="tweet__info">
          <span className="tweet__username">{user.name}</span>
          <span className="tweet__timestamp">{date}</span>
        </div>
        <div className="tweet__body">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default Tweet;