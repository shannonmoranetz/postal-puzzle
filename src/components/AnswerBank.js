import React, { Component }  from 'react';
import AnswerCard from './AnswerCard';
import '../../src/styles/main.scss';

export default class AnswerBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shuffledAnswers: [
        "An app used in React to create components.",
        "A feature specific to Node.js.",
        "Code that can't be re-used once it has executed."
        ]
    };
  };

  componentWillReceiveProps() {
    if (this.props.isLoaded === true) {
      this.shuffleAnswers()
    }
  }

  shuffleAnswers = () => {
      let shuffledArray = this.props.currentIncorrectAnswers.sort(function(){
        return 0.5 - Math.random()
      })
      this.setState({
        shuffledAnswers: shuffledArray.concat(this.props.currentAnswer)
      })
  }

  render() {
    if (this.props.isLoaded) {
      return(
        <div className="answer-bank">
        <ul>
          {
            this.state.shuffledAnswers.map((incorrectAnswer, index) => {
              return (
                <AnswerCard key={index} answer={incorrectAnswer}/>                                                                                                                  
              )
            })
          }
        </ul>
      </div>
    )
    } else {
      return(null)
    }
  }
};