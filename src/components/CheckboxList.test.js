import React from 'react';
import { shallow } from 'enzyme';
import CheckBoxList from './CheckboxList'

const changeFn = jest.fn();
const submitFn = jest.fn();

const testProps = {
  title: 'Test Title',
  list: [{ name: 'Person 1' }],
  groupName: 'testGroup',
  handleChange: changeFn,
  handleSubmit: submitFn,
  sumbitLabel: 'Submit'

}
const component = shallow(<CheckBoxList {...testProps} />);

describe('CheckBoxList', () => {
  it('should render correctly ', () => {
    expect(component).toMatchSnapshot()
  })

  it('should trigger changeFn when a checkbox value changes', () => {
    component.find('.cbl-checkbox').first().simulate('change')
    expect(changeFn).toHaveBeenCalled()
  })

  it('should trigger changeFn when checkbox label is clicked', () => {
    component.find('.cbl-label').first().simulate('click')
    expect(changeFn).toHaveBeenCalled()
  })

  it('should trigger submitFn when the submit button is clicked', () => {
    component.find('.cbl-submit').first().simulate('click')
    expect(submitFn).toHaveBeenCalled()
  })
});