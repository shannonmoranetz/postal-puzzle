import React from 'react';
import AnswerCard from '../../src/components/AnswerCard';
import { shallow } from 'enzyme';

const passAnswerMock = jest.fn();

describe('AnswerCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <AnswerCard passAnswer={passAnswerMock}/>
    );
  });

  // it('should call passAnswer from props when checkSelection is called', () => {
  //   wrapper.find('.card').simulate('click');
  //   expect(passAnswerMock).toBeCalled( { target: { innerText: '.copyWithin()' } } );
  // });
});