import React from 'react';
import AnswerBank from '../../src/components/AnswerBank';
import { shallow } from 'enzyme';

const checkAnswerMock = jest.fn();

describe('AnswerBank', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <AnswerBank shuffledAnswers={[]}
                  checkAnswer={checkAnswerMock}/>
    );
  });

  it('should call checkAnswer from props when passAnswer is called', () => {
    wrapper.instance().passAnswer();   
    expect(checkAnswerMock).toHaveBeenCalled();
  });
});