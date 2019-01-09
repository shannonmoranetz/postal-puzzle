import React, { Component } from 'react';
import '../../src/styles/main.scss';

export default class AnswerCard extends Component {
  constructor(props) {
    super(props);
  };

  checkSelection = (e) => {
    let answerText = e.target.innerText;
    this.props.passAnswer(answerText)
  }

  render() {
    return (
      <li className="card" onClick={this.checkSelection}>{this.props.answer}</li>
    )
  }  
};