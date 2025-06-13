import React from 'react';
import Footer from '../components/Footer'; 
import './About.css'; 

function About() {
  return (
    <div className="about-page">
      <h1 className="text-3xl font-bold mb-4">About Twittler</h1>
      <p className="text-gray-700 leading-relaxed mb-4">
        Twittler는 여러분의 생각을 자유롭게 공유하고, 친구들과 소통하며, 
        세상의 소식을 실시간으로 접할 수 있는 소셜 미디어 플랫폼입니다.
        저희는 사용자의 목소리에 귀 기울이며, 더 나은 서비스를 제공하기 위해 
        지속적으로 노력하고 있습니다.
      </p>
      <p className="text-gray-700 leading-relaxed">
        이 프로젝트는 React와 기본 웹 기술을 사용하여 구축된 데모 애플리케이션입니다.
        코드의 구조와 컴포넌트 간의 상호작용을 학습하는 데 중점을 두었습니다.
      </p>

      {/* About 컴포넌트의 자식으로 Footer 컴포넌트 연결 */}
      <Footer />
    </div>
  );
}

export default About;