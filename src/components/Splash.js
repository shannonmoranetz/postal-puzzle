import React, { Component } from 'react';
import '../../src/styles/main.scss';

export default class Splash extends Component {
  constructor() {
    super();
    this.state = {
    };
  };

  render() {
    return (
      <button className="f" onClick={this.props.toggleSplash}>SPLASH</button>
    )
  }  
};
