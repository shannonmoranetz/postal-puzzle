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
      currentQuestionCount: 0,
      questionsAnsweredWrong: []
      // an array of objects of questions
      // filter over questionsAnsweredWrong to reassign shuffledArray
    };
  };

  componentDidMount() {
    let value = localStorage.getItem('questionsAnsweredWrong');
    value = JSON.parse(value)
    fetch('http://memoize-datasets.herokuapp.com/api/v1/questionData')
      .then(response => response.json())
      .then(data => {
        this.setState({
          allQuestions: data.questionData,
          isLoaded: true,
          score: 0,
          questionsAnsweredWrong: value || []
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
    let shuffledArray = [this.state.allQuestions[this.state.currentQuestionCount].correctAnswer]
    shuffledArray = shuffledArray.concat(this.state.allQuestions[this.state.currentQuestionCount].incorrectAnswers)
    shuffledArray.sort(() => {
      return 0.5 - Math.random()
    })
    return shuffledArray;
  }

  checkAnswer = (isCorrect) => {
    if (isCorrect === this.state.allQuestions[this.state.currentQuestionCount].correctAnswer) {
      console.log('correct!')
      this.updateScoreSum()
    } else {
      console.log('incorrect...')
      let incorrectQuestions = this.state.questionsAnsweredWrong.concat(this.state.allQuestions[this.state.currentQuestionCount])
      this.saveIncorrectQuestions(incorrectQuestions)
    }
    this.updateCurrentQuestion();
  }

  updateScoreSum = () => {
    let updatedScore = this.state.score + this.state.allQuestions[this.state.currentQuestionCount].pointsValue;
    this.setState({
      score: updatedScore
    })
  }

  saveIncorrectQuestions = (incorrectQuestions) => { 
    // console.log(incorrectQuestions)
    localStorage.setItem('questionsAnsweredWrong', JSON.stringify(incorrectQuestions))
      this.setState({
        questionsAnsweredWrong: incorrectQuestions
      })
  }

  fetchIncorrectQuestions = () => {
    let value = localStorage.getItem('questionsAnsweredWrong');
    value = JSON.parse(value)
    this.setState({
      questionsAnsweredWrong: value
    })
  }

  checkIfGameOver = () => {
    if (this.state.currentQuestionCount > this.state.allQuestions.length) {
      this.setState({
        currentQuestionCount: 0,
        score: 0
      })
    }
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
          <ScorePanel score={this.state.score}/>
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

