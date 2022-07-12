import React from 'react';
import PropTypes from 'prop-types';

import PasswordInput from './PasswordInput';

function InputGroup({ type = 'text', name, onChange, children }) {
  const renderInput = () => {
    if (type === 'password') {
      return <PasswordInput name={name} onChange={onChange} />;
    } else {
      return <input type={type} id={`${name}-input`} name={name} onChange={onChange} />;
    }
  };

  return (
    <label htmlFor={`${name}-input`}>
      <span>{children}</span>
      <br />
      {renderInput()}
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
