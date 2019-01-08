import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/components/App.js';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App />
    );
  });

  it('should have the proper default state', () => {
    expect(wrapper.state()).toEqual({
      allQuestions: [],
      isLoaded: false,
      currentQuestionCount: 0,
      score: 0,
      answerIsCorrect: true
    });
  });

  // it('should update renderSplashPage when toggleSplash is called', () => {
  //   expect(wrapper.state('renderSplashPage')).toEqual(true);
  //   wrapper.instance().toggleSplash();
  //   expect(wrapper.state('renderSplashPage')).toEqual(false);
  // });

}); 