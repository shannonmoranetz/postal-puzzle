import React, { Component }  from 'react';
import AnswerCard from './AnswerCard';
import '../../src/styles/main.scss';

export default class AnswerBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shuffledAnswers: []
    };
  };

  componentDidMount() {
    this.shuffleAnswers();
  }

  componentWillReceiveProps() {
    if (this.props.isLoaded === true) {
      this.shuffleAnswers()
    }
  }

  shuffleAnswers = () => {
      let shuffledArray = this.props.currentIncorrectAnswers.sort(function(){
        return 0.5 - Math.random()
      })
      this.setState({
        shuffledAnswers: shuffledArray.concat(this.props.currentAnswer)
      })
  }



  render() {
    return(
      <div className="answer-bank">
        <ul>
          {
            this.state.shuffledAnswers.map((incorrectAnswer, index) => {
              return (
                <AnswerCard key={index} answer={incorrectAnswer}/>                                                                                                                  
              )
            })
          }
        </ul>
    </div>
  )} 
};