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
      isLoaded: false,
      currentQuestionCount: 0
    };
  };

  componentDidMount() {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/questionData')
      .then(response => response.json())
      .then(data => {
        this.setState({
          allQuestions: data.questionData,
          isLoaded: true
        });
      })
      .catch(error => console.log(error));
  };

  // updating late, always 1 behind
  updateCurrentQuestion = () => {
    this.setState({
      currentQuestionCount: (this.state.currentQuestionCount + 1)
    });
  };

  render() {
    if (this.state.isLoaded === true) {
      return (
        <div className="app-container">
          <h1 className="app-title">Postal Puzzle</h1>
          <QuestionCard currentQuestion={this.state.allQuestions[this.state.currentQuestionCount].question}/>
          {this.state.currentQuestionCount === 0 ? (
          <AnswerBank currentAnswer={this.state.allQuestions[this.state.currentQuestionCount].correctAnswer}
                      currentIncorrectAnswers={this.state.allQuestions[this.state.currentQuestionCount].incorrectAnswers}
                      isLoaded={this.state.isLoaded}/>
          ) : (
            <AnswerBank currentAnswer={this.state.allQuestions[this.state.currentQuestionCount].correctAnswer}
                        currentIncorrectAnswers={this.state.allQuestions[this.state.currentQuestionCount].incorrectAnswers}
                        isLoaded={this.state.isLoaded}/>
          )}
          <Character />
          <Options />
          <ScorePanel />
          <button className="submit-guess" onClick={this.updateCurrentQuestion}>NEXT!</button>
        </div>
      )
    } else {
      return (
        <div>
          <p>loading...</p>
        </div>
      )
    }
  };
};

