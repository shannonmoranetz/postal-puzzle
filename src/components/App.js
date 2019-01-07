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
      incorrectQuestionRefs: [],
      testState: []
    };
  };

  componentWillMount() {
    localStorage.getItem('incorrectQuestionRefs')
    && this.setState ({
      incorrectQuestionRefs: JSON.parse(localStorage.getItem('incorrectQuestionRefs'))
    })
  }

  componentDidMount() {
    this.fetchData();
  };

  assignAllQuestions = () => {
    let newArray = this.state.allQuestions.map((question, index) => {
      if (this.state.incorrectQuestionRefs.includes(index)) {
        return question;
      } else {
        return 'deleted';
      }
    })
    let newerArray = newArray.filter(a => a !== 'deleted')
    console.log(newerArray)
    this.setState({
      testState: newerArray
    })
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('incorrectQuestionRefs', JSON.stringify(nextState.incorrectQuestionRefs));
  }

  fetchData = () => {
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
  }

  checkAnswer = (isCorrect) => {
    if (isCorrect === this.state.allQuestions[this.state.currentQuestionCount].correctAnswer) {
      console.log('correct!')
      let trackIfCorrect = this.state.incorrectQuestionRefs.concat(this.state.currentQuestionCount);
      this.setState({ incorrectQuestionRefs: trackIfCorrect })
      this.updateScoreSum()
    } else {
      console.log('incorrect...')
      let trackIfCorrect = this.state.incorrectQuestionRefs.concat(-1);
      this.setState({ incorrectQuestionRefs: trackIfCorrect })
    }
    this.updateCurrentQuestion();
    if (localStorage.getItem('incorrectQuestionRefs') !== [] && this.state.allQuestions !== []) {
      this.assignAllQuestions()
    }
  }

  checkIfGameOver = () => {
    console.log(this.state.currentQuestionCount)
    if (this.state.currentQuestionCount === 29) {
      this.setState({
        currentQuestionCount: 0,
        score: 0,
        allQuestions: this.state.testState
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

