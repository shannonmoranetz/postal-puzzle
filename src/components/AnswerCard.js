import React, { Component } from 'react';
import '../../src/styles/main.scss';

export default class AnswerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    return (
      <li>{this.props.answer}</li>
    )
  }  
};