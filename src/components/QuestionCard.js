import React from 'react';
import '../../src/styles/main.scss';

export default function QuestionCard(props) {
  return (
    <p>{props.currentQuestion}</p>
  )
};