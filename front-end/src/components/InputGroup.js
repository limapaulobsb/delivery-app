import React from 'react';
import PropTypes from 'prop-types';

function InputGroup({ children, name, onChange, type = 'text' }) {
  return (
    <label htmlFor={`${name}-input`}>
      <span>{children}</span>
      <br />
      <input type={type} id={`${name}-input`} name={name} onChange={onChange} />
    </label>
  );
}

InputGroup.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
}.isRequired;

export default InputGroup;
