import React from 'react';
import PropTypes from 'prop-types';
// import css from './Filter.module.css';

export const Filter = ({ value, onChange }) => {
  return (
    <label>
      <p>Find contacts by name</p>
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
};

Filter.PropType = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
