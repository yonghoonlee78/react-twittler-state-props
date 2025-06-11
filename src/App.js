import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Tweets from './pages/Tweets';
import MyPage from './pages/MyPage';
import About from './pages/About';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Sidebar />
          <section className="features">
            <Routes>
              <Route path="/" element={<Tweets />} />
              <Route path="/about" element={<About />} />
              <Route path="/mypage" element={<MyPage />} />
            </Routes>
          </section>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
