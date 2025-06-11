import React from 'react';
import Footer from '../Footer';
import './About.css';

const About = () => {
  return (
    <section className="aboutTwittler">
      <div className="aboutTwittler__container">
        <div className="aboutTwittler__wrapper">
          <div className="aboutTwittler__detail">
            <p className="aboutTwittler__detailName">나의 리엑트 트위터</p>
          <div className="aboutTwittler__info">
            <h2>트워터에 대해...</h2>
            <p>리엑트 기반의 간단한 트위터</p>
            <ul>
              <li>한번 구경해주세요</li>
              <li>저는 밥이라고 합니다.</li>
              
            </ul>
          </div>
        </div>
      </div>
      </div>
      <div className="aboutTwittler__content">
        <i className="fas fa-users"></i>
        <h3> 나만의 Twittler 소개페이지입니다 </h3>
        <ul>
          <li>인사가 늦었습니다.</li>
          <li>저는 밥이라고 합니다. rice는 아니에요</li>
          <li>미니 트위터에 와주셔서 감사합니다.</li>
        </ul>
      </div>
      <Footer />
    </section>
  );
};

export default About;
