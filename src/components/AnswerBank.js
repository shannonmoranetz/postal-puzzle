import React, { Component }  from 'react';
import AnswerCard from './AnswerCard';
import '../../src/styles/main.scss';

export default class AnswerBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  checkAnswer = (isCorrect) => {
    this.props.checkAnswer(isCorrect)
  }

  render() {
    return(
      <div className="answer-bank">
        <ul>
          {
            this.props.shuffledAnswers.map((incorrectAnswer, index) => {
              return (
                <AnswerCard key={index} answer={incorrectAnswer} checkAnswer={this.props.checkAnswer}/>                                                                                                                  
              )
            })
          }
        </ul>
    </div>
  )} 
};