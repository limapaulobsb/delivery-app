import React from 'react';
import PropTypes from 'prop-types';

function InputGroup({ type = 'text', name, onChange, children }) {
  return (
    <label htmlFor={`${name}-input`}>
      <span>{children}</span>
      <br />
      <input type={type} id={`${name}-input`} name={name} onChange={onChange} />
    </label>
  );
}

InputGroup.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

export default InputGroup;
