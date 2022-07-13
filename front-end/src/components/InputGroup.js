import React from 'react';
import PropTypes from 'prop-types';

import PasswordInput from './PasswordInput';

function InputGroup({ defaultValue, label, name, onChange, type = 'text', value }) {
  // Render functions
  const renderInput = () => {
    if (type === 'password') {
      return <PasswordInput name={name} value={value} onChange={onChange} />;
    } else {
      return (
        <input
          type={type}
          id={`${name}-input`}
          name={name}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
        />
      );
    }
  };

  // Main render
  return (
    <label htmlFor={`${name}-input`}>
      <span>{label}</span>
      <br />
      {renderInput()}
    </label>
  );
}

InputGroup.propTypes = {
  defaultValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default InputGroup;
