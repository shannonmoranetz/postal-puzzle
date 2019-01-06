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

  updateCurrentQuestion = () => {
    this.setState({
      currentQuestionCount: (this.state.currentQuestionCount + 1)
    });
  };

  shuffleAnswers = () => {
    let shuffledArray = this.state.allQuestions[this.state.currentQuestionCount].incorrectAnswers.sort(function(){
      return 0.5 - Math.random()
    })
    return shuffledArray.concat(this.state.allQuestions[this.state.currentQuestionCount].correctAnswer)
  }

  checkAnswer = (isCorrect) => {
    if(isCorrect === this.state.allQuestions[this.state.currentQuestionCount].correctAnswer) {
      console.log('correct!')
    } else {
      console.log('incorrect...')
    }
    this.updateCurrentQuestion()
  }

  render() {
    if (this.state.isLoaded === true) {
      return (
        <div className="app-container">
          <h1 className="app-title">Postal Puzzle</h1>
          <QuestionCard currentQuestion={this.state.allQuestions[this.state.currentQuestionCount].question}/>
          <AnswerBank shuffledAnswers={this.shuffleAnswers()}
                      isLoaded={this.state.isLoaded}
                      checkAnswer={this.checkAnswer}/>
          <Character />
          <Options />
          <ScorePanel />
          {/* <button className="submit-guess" onClick={this.updateCurrentQuestion}>NEXT!</button> */}
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

