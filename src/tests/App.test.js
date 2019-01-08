import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/components/App.js';
import { shallow } from 'enzyme';

const currentQuestion = [{
  question: "What is a package?",
  correctAnswer: "One or more modules grouped together that solve a problem.",
  incorrectAnswers: [
  "An app used in React to create components.",
  "A feature specific to Node.js.",
  "Code that can't be re-used once it has executed."
  ],
  category: "Concepts",
  difficulty: "Easy",
  pointsValue: 100,
  questionID: 0
}];

const moveToNextQuestionMock = jest.fn();

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App moveToNextQuestion={moveToNextQuestionMock}/>
    );
  });

  it('should have the proper default state', () => {
    expect(wrapper.state()).toEqual({
      allQuestions: [],
      isLoaded: false,
      currentQuestionCount: 0,
      score: 0,
      answerIsCorrect: true
    })
  })

  it('should properly render the component elements', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App moveToNextQuestion={moveToNextQuestionMock}/>
    );
  });

  // it('should call moveToNextQuestion if answerIsCorrect is false', () => {
  //   wrapper.setState({
  //     isLoaded: true,
  //     answerIsCorrect: false,
  //     allQuestions: currentQuestion
  //    })
  //   wrapper.find('.confirm-move-on').simulate('click');
  //   expect(moveToNextQuestionMock).toHaveBeenCalled();
  // });

  it('should only render the QuestionCard and AnswerBank component when loaded', () => {
    wrapper.setState({
      isLoaded: true,
      allQuestions: currentQuestion
     })
    expect(wrapper.find('QuestionCard').length).toEqual(1)
    expect(wrapper.find('AnswerBank').length).toEqual(1)
  })

  it('should check the answer, and if correct, update score and correct marker to true', () => {
    wrapper.setState({
      allQuestions: currentQuestion
    })
    expect(wrapper.state('answerIsCorrect')).toEqual(true);
    wrapper.instance().checkAnswer(currentQuestion[0].correctAnswer);
    expect(wrapper.state('score')).toEqual(100);
    expect(wrapper.state('answerIsCorrect')).toEqual(true);
  });

  it('should check the answer, and if incorrect, update correct marker to false', () => {
    wrapper.setState({
      allQuestions: currentQuestion
    })
    expect(wrapper.state('answerIsCorrect')).toEqual(true);
    wrapper.instance().checkAnswer('Incorrect Answer');
    expect(wrapper.state('answerIsCorrect')).toEqual(false);
  });

  it('should update the score with the current question point value', () => {
    wrapper.setState({ 
      allQuestions: currentQuestion
     })
    expect(wrapper.state('score')).toEqual(0);
    wrapper.instance().updateScoreSum();
    expect(wrapper.state('score')).toEqual(100);
  });

  it('should move to the next question by updating the correct marker to true', () => {
    wrapper.setState({
      answerIsCorrect: false
     })
    expect(wrapper.state('answerIsCorrect')).toEqual(false);
    wrapper.instance().moveToNextQuestion();
    expect(wrapper.state('answerIsCorrect')).toEqual(true);
  });

  it('should only reset the current question count and score to 0 if all questions are answered', () => {
    wrapper.setState({
      currentQuestionCount: 10,
      score: 100
     })
    wrapper.instance().checkIfGameOver();
    expect(wrapper.state('currentQuestionCount')).toEqual(10);
    expect(wrapper.state('score')).toEqual(100);
    wrapper.setState({
      currentQuestionCount: 29
     })
    wrapper.instance().checkIfGameOver();
    expect(wrapper.state('currentQuestionCount')).toEqual(0);
    expect(wrapper.state('score')).toEqual(0);
  });

}); 