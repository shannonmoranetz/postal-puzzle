import React, { Component }  from 'react';
import AnswerCard from './AnswerCard';
import '../../src/styles/main.scss';

export default class AnswerBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  

  render() {
    if (this.props.isLoaded) {
      return(
        <div className="answer-bank">
        <ul>
          <li>{this.props.currentAnswer}</li>                                                                                                               
          {
            this.props.currentIncorrectAnswers.map((incorrectAnswer, index) => {
              return (
                <AnswerCard key={index} answer={incorrectAnswer}/>                                                                                                                  
              )
            })
          }
        </ul>
      </div>
    )
    } else {
      return(null)
    }
  }
};