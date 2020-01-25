import React from 'react'
import PropTypes from 'prop-types';

const CheckboxList = props => {
  return (
    <>
      <fieldset>
        <legend>{props.title}</legend>
        {props.list.map((item, idx) =>
          <div key={idx}>
            <input type='checkbox'
              className='cbl-checkbox'
              id={`cbl-${idx}`}
              name={props.groupName}
              value={item.name}
              onChange={props.handleChange} />
            <label htmlFor={`cbl-${idx}`}
              className='cbl-label'>{item.name}</label>
          </div>
        )}
      </fieldset>
      <button type='button'
        className='cbl-submit'
        onClick={props.handleSubmit}>{props.sumbitLabel}</button>
    </>
  )
}

CheckboxList.propTypes = {
  title: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ),
  groupName: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  sumbitLabel: PropTypes.string
}

export default CheckboxList