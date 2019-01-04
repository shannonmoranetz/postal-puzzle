import React, { Component } from 'react';
import AnswerCard from './AnswerCard';
import Character from './Character';
import Options from './Options';
import QuestionCard from './QuestionCard';
import ScorePanel from './ScorePanel';
import Splash from './Splash';
import '../../src/styles/main.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      renderSplash: true
    };
  };

  toggleSplash = () => {
    this.setState({
      renderSplash: !this.state.renderSplash
    });
  };

  render() {
    if (this.state.renderSplash) {
      return (
        <Splash toggleSplash={this.toggleSplash}/>
      )
    } else {
      return (
        <div>
        <AnswerCard />
        <Character />
        <Options />
        <QuestionCard />
        <ScorePanel />
      </div>
      )
    }  
  };
};

