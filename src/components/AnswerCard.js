import React, { Component } from 'react';
import '../../src/styles/main.scss';

export default class AnswerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
  };

  componentWillReceiveProps() {
    this.setState({
      isSelected: false
    })
  }

  checkSelection = () => {
    this.setState({
      isSelected: true
    })
    this.props.checkAnswer(this.state.isSelected)
  }

  render() {
    return (
      <li onClick={this.checkSelection}>{this.props.answer}</li>
    )
  }  
};