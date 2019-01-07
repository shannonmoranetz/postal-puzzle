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
          isLoaded: true,
          score: 0
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
    shuffledArray.sort(function(){
      return 0.5 - Math.random()
    })
    return shuffledArray;
  }

  checkAnswer = (isCorrect) => {
    if(isCorrect === this.state.allQuestions[this.state.currentQuestionCount].correctAnswer) {
      console.log('correct!')
      this.updateScoreSum()
    } else {
      console.log('incorrect...')
    }
    this.updateCurrentQuestion()
  }

  updateScoreSum = () => {
    let updatedScore = this.state.score + this.state.allQuestions[this.state.currentQuestionCount].pointsValue;
    this.setState({
      score: updatedScore
    })
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

