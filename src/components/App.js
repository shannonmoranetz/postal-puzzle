import React, { Component } from 'react';
import AnswerBank from './AnswerBank';
import '../../src/styles/main.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      allQuestions: [],
      isLoaded: false,
      currentQuestionCount: 0,
      score: 0,
      answerIsCorrect: true
    };
  };

  componentDidMount = () => {
    this.fetchData()
  };

  fetchData = () => {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/questionData')
    .then(response => response.json())
    .then(data => {
      this.setState({
        allQuestions: data.questionData,
        isLoaded: true,
        score: 0
      })
    })
    .catch(error => console.log(error));
  }

  shuffleAnswers = () => {
    let shuffledArray = [this.state.allQuestions[this.state.currentQuestionCount].correctAnswer]
    shuffledArray = shuffledArray.concat(this.state.allQuestions[this.state.currentQuestionCount].incorrectAnswers)
    shuffledArray.sort(() => {
      return 0.5 - Math.random()
    })
    return shuffledArray;
  }

  checkAnswer = (isCorrect) => {
    if (isCorrect === this.state.allQuestions[this.state.currentQuestionCount].correctAnswer) {
      this.updateScoreSum()
      this.setState({
        answerIsCorrect: true
      })
    } else {
      this.setState({
        answerIsCorrect: false
      })
    }
    this.updateCurrentQuestion();
  }

  updateScoreSum = () => {
    let updatedScore = this.state.score + this.state.allQuestions[this.state.currentQuestionCount].pointsValue;
    this.setState({
      score: updatedScore
    })
  }

  updateCurrentQuestion = () => {
    this.setState({
      currentQuestionCount: (this.state.currentQuestionCount + 1)
    })
    this.checkIfGameOver()
  }

  moveToNextQuestion = () => {
    this.setState({
      answerIsCorrect: true
    })
  }

  checkIfGameOver = () => {
    if (this.state.currentQuestionCount === 29) {
      this.setState({
        currentQuestionCount: 0,
        score: 0
      })
    }
  }

  render() {
    if (this.state.isLoaded === true && this.state.answerIsCorrect === true) {
      return (
        <div className="app-container">
         <div className="header-bar">
            <h1 className="app-title">Postal Puzzle</h1>
          </div>
          <main className="main-content">
          <div className="info-container">
            <div className="score-container">
              <p className="score">Score: {this.state.score}</p>
            </div>
            <p className="category"><span className="category-bold">Category: </span>{this.state.allQuestions[this.state.currentQuestionCount].category}</p>
            <p className="difficulty"><span className="difficulty-bold">Difficulty: </span>{this.state.allQuestions[this.state.currentQuestionCount].difficulty}</p>
            <p className="points-value">This question is worth <span className="points-value-bold">{this.state.allQuestions[this.state.currentQuestionCount].pointsValue}</span> points.</p>
          </div>
         <div className="game-container">
            <h3 className="question-count">Question #{(this.state.currentQuestionCount + 1)}</h3>
            <p className="question">{this.state.allQuestions[this.state.currentQuestionCount].question}</p>
            <AnswerBank shuffledAnswers={this.shuffleAnswers()}
                        isLoaded={this.state.isLoaded}
                        checkAnswer={this.checkAnswer}/>
            </div>
          </main>
        </div>
      )
    } else if (this.state.isLoaded === true && this.state.answerIsCorrect === false) {
      return (
        <div className="app-container-alt">
          <div className="header-bar">
            <h1 className="app-title">Postal Puzzle</h1>
          </div>
          <div className="incorrect-info-container">
            <div className="incorrect-info-elements">
              <div className="question-heading">
                <h3 className="question-alt">Question #{(this.state.currentQuestionCount)}</h3>
              </div>
              <p className="incorrect-display">Incorrect...</p>
              <p className="correct-display">The correct answer was:</p>
              <p className="show-correct">{this.state.allQuestions[this.state.currentQuestionCount].correctAnswer}</p>
              <button className="confirm-move-on" onClick={this.moveToNextQuestion}>Next Question</button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <p className="loading">Now Loading...</p>
        </div>
      )
    }
  };
};

