import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; 
const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/">
            <i className="fas fa-comment-dots"></i> 
          </Link>
        </li>
        <li>
          <Link to="/about">
            <i className="fas fa-question-circle"></i> 
          </Link>
        </li>
        <li>
          <Link to="/mypage"> 
            <i className="fas fa-user"></i> 
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;