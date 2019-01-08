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
      questionIDs: []
    };
  };

  componentDidMount() {
    this.fetchData();
    localStorage.getItem('questionIDs')
    && this.setState ({
      questionIDs: JSON.parse(localStorage.getItem('questionIDs'))
    })
  };

  fetchData = () => {
    fetch('http://memoize-datasets.herokuapp.com/api/v1/questionData')
    .then(response => response.json())
    .then(data => {
      this.setState({
        allQuestions: data.questionData,
        isLoaded: true,
        score: 0
      }, this.retrieveQuestions(data));
    })
    .catch(error => console.log(error));
  }

  retrieveQuestions = (data) => {
    if (localStorage.getItem('questionIDs') !== null) {

      let questionIDs = JSON.parse(localStorage.getItem('questionIDs'))
      let questions = data.questionData
      
      let questionsGuessedWrong = questions.filter(question => {
        if (questionIDs.includes(question.questionID)) {
          return question;
        }
      })
      console.log(questionsGuessedWrong)
      this.setState({
        allQuestions: questionsGuessedWrong
      })
    }
  }

  // updateQuestions(questionsGuessedWrong) {
  //   this.setState({
  //     allQuestions: questionsGuessedWrong
  //   })
  // }

  checkAnswer = (isCorrect) => {
    if (isCorrect === this.state.allQuestions[this.state.currentQuestionCount].correctAnswer) {
      console.log('correct!')
      this.updateScoreSum()
    } else {
      console.log('incorrect...')
      let existingQuestionIDs = this.state.questionIDs
      this.setState({
        questionIDs: existingQuestionIDs.concat(this.state.currentQuestionCount)
      }, this.saveToLocalStorage());
    }
    this.updateCurrentQuestion();
  }

  saveToLocalStorage = () => {
    localStorage.setItem('questionIDs', JSON.stringify(this.state.questionIDs))
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
    });
    this.checkIfGameOver()
  };

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



  render() {
    if (this.state.isLoaded === true) {
      return (
        <div className="app-container">
          <h1 className="app-title">Postal Puzzle</h1>
          <h3>Question #{this.state.currentQuestionCount}</h3>
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

