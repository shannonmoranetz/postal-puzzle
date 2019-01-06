import React from 'react';
import AnswerCard from './AnswerCard';
import '../../src/styles/main.scss';

export default function AnswerBank(props) {
  if (props.currentIncorrectAnswers) {
  return(
    <div className="answer-bank">
      <ul>
        <li>{props.currentAnswer}</li>                                                                                                               
          {
            props.currentIncorrectAnswers.map((incorrectAnswer, index) => {
              return (
                <AnswerCard key={index} answer={incorrectAnswer}/>       
                // <li>{incorrectAnswer}</li>                                                                                                               
              )
            })
          }
      </ul>
    </div>
  )
  } else {
    return(null)
  }
};