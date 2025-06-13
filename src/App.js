import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar'; 
import Tweets from './pages/Tweets';       
import About from './pages/About';        
import MyPage from './pages/MyPage';       
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="app-container"> 
        <Sidebar /> 
        <main className="main-content"> 
          <Routes>
            <Route path="/" element={<Tweets />} /> 
            <Route path="/about" element={<About />} /> 
            <Route path="/mypage" element={<MyPage />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
