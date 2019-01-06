import React, { Component } from 'react';
import '../../src/styles/main.scss';

export default class AnswerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };


  checkSelection = (event) => {
    let answerText = event.currentTarget.innerText;
    this.props.checkAnswer(answerText)
  }

  render() {
    return (
      <li onClick={this.checkSelection}>{this.props.answer}</li>
    )
  }  
};