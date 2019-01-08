import React, { Component } from 'react';
import AnswerBank from './AnswerBank';
import QuestionCard from './QuestionCard';
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

  checkIfGameOver = () => {
    if (this.state.currentQuestionCount === 29) {
      this.setState({
        currentQuestionCount: 0,
        score: 0
      })
    }
  }

  updateCurrentQuestion = () => {
    this.setState({
      currentQuestionCount: (this.state.currentQuestionCount + 1)
    })
    this.checkIfGameOver()
  }

  shuffleAnswers = () => {
    let shuffledArray = [this.state.allQuestions[this.state.currentQuestionCount].correctAnswer]
    shuffledArray = shuffledArray.concat(this.state.allQuestions[this.state.currentQuestionCount].incorrectAnswers)
    shuffledArray.sort(() => {
      return 0.5 - Math.random()
    })
    return shuffledArray;
  }

  updateScoreSum = () => {
    let updatedScore = this.state.score + this.state.allQuestions[this.state.currentQuestionCount].pointsValue;
    this.setState({
      score: updatedScore
    })
  }

  nextQuestion = () => {
    this.setState({
      answerIsCorrect: true
    })
  }

  render() {
    if (this.state.isLoaded === true && this.state.answerIsCorrect === true) {
      return (
        <div className="app-container">
          <h1 className="app-title">Postal Puzzle</h1>
          <p>{this.state.score}</p>
          <h3>Question #{(this.state.currentQuestionCount + 1)}</h3>
          <QuestionCard currentQuestion={this.state.allQuestions[this.state.currentQuestionCount].question}/>
          <AnswerBank shuffledAnswers={this.shuffleAnswers()}
                      isLoaded={this.state.isLoaded}
                      checkAnswer={this.checkAnswer}/>
        </div>
      )
    } else if (this.state.isLoaded === true && this.state.answerIsCorrect === false) {
      return (
        <div className="app-container">
          <h1 className="app-title">Postal Puzzle</h1>
          <p>{this.state.score}</p>
          <h3>Question #{(this.state.currentQuestionCount)}</h3>
          <p>Incorrect...</p>
          <p>The correct answer was:</p>
          <p>{this.state.allQuestions[this.state.currentQuestionCount].correctAnswer}</p>
          <button onClick={this.nextQuestion}>Next Question</button>
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

