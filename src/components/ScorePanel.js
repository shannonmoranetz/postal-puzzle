import React, { Component } from 'react';
import '../../src/styles/main.scss';

export default class ScorePanel extends Component {
  constructor() {
    super();
    this.state = {
    };
  };

  render() {
    return (
      <h3>{this.props.score}</h3>
    )
  }  
};