import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import TestRenderer from 'react-test-renderer';

import Footer from 'scr/Footer';
import About from 'scr/About'; 
import './About.css';

const aboutTest = {
  main() {
    test('About 컴포넌트의 자식 컴포넌트로 Footer 컴포넌트가 있어야 합니다.', () => {
      const aboutInstance = TestRenderer.create(<About />).root;
      expect(aboutInstance.findByType(Footer).type).toBe(Footer);
    });
  },
};

export default aboutTest;