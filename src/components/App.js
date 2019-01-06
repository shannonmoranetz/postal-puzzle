import React, { Component } from 'react';
import AnswerBank from './AnswerBank';
import Character from './Character';
import Options from './Options';
import QuestionCard from './QuestionCard';
import ScorePanel from './ScorePanel';
import '../../src/styles/main.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      allQuestions: [],
      currentQuestion: {},
      currentQuestionCount: 0
    };
  };

  componentDidMount() {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/questionData')
      .then(response => response.json())
      .then(data => {
        this.setState({
          allQuestions: data.questionData
        });
      })
      .catch(error => console.log(error));
  };

  updateCurrentQuestion = () => {
    this.setState({
      currentQuestionCount: (this.state.currentQuestionCount + 1),
      currentQuestion: this.state.allQuestions[this.state.currentQuestionCount]
    });
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="app-title">Postal Puzzle</h1>
        <QuestionCard currentQuestion={this.state.currentQuestion.question}/>
        <AnswerBank currentAnswer={this.state.currentQuestion.correctAnswer}
                    currentIncorrectAnswers={this.state.currentQuestion.incorrectAnswers}/>
        <Character />
        <Options />
        <ScorePanel />
        <button className="submit-guess" onClick={this.updateCurrentQuestion}>Answer!</button>
      </div>
    )
  };
};

