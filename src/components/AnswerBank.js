import React, { Component }  from 'react';
import AnswerCard from './AnswerCard';
import '../../src/styles/main.scss';

export default class AnswerBank extends Component {
  constructor(props) {
    super(props);
  };

  passAnswer = (isCorrect) => {
    this.props.checkAnswer(isCorrect)
  }

  render() {
    return(
      <div className="answer-bank">
        <ul className="answer-list"> 
          {
            this.props.shuffledAnswers.map((incorrectAnswer, index) => {
              return (
                <AnswerCard key={index} answer={incorrectAnswer} passAnswer={this.props.checkAnswer}/>                                                                                                                  
              )
            })
          }
        </ul>
    </div>
  )} 
};