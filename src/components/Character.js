import React, { Component } from 'react';
import '../../src/styles/main.scss';

export default class Character extends Component {
  constructor() {
    super();
    this.state = {
    };
  };


  render() {
    return (
      <p className="b">hi: character</p>
    )
  }  
};