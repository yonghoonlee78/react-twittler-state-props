import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import TestRenderer from 'react-test-renderer';

// src/__tests__/ 에서 src/pages/ 로 접근하는 올바른 상대 경로: ../pages/
import Tweets from '../pages/Tweets';
import MyPage from '../pages/MyPage';
import About from '../pages/About'; 

// Footer.js의 경로는 src/components에 있다면 ../components/Footer 가 맞을 것입니다.
import Footer from '../components/Footer';

// About 컴포넌트가 어떤 형태로 임포트되는지 확인하는 진단 로그 추가
console.log("About component type in App.test.js:", typeof About);
console.log("About component value in App.test.js:", About);


const aboutTest = {
  main() {
    test('About 컴포넌트의 자식 컴포넌트로 Footer 컴포넌트가 있어야 합니다.', () => {
      // About이 유효한 React 컴포넌트 타입인지 다시 한번 명시적으로 확인
      if (typeof About !== 'function' && typeof About !== 'object' && About === null) {
          throw new Error("About is not a valid React component type. Please check its export from About.js.");
      }
      if (typeof About === 'object' && About !== null && Object.keys(About).length === 0) {
          throw new Error("About is an empty object. This might indicate a module resolution issue or an empty About.js file.");
      }

      const aboutInstance = TestRenderer.create(<About />).root;
      expect(aboutInstance.findByType(Footer).type).toBe(Footer);
    });
  },
};

// Jest가 테스트를 발견하고 실행할 수 있도록 main 메서드를 호출합니다.
aboutTest.main(); 

export default aboutTest; // 이 export는 사실 테스트 실행에는 직접적인 영향이 없습니다.