import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import '../styles/PasswordInput.css';

function PasswordInput({ name, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='input-container'>
      <input
        type={showPassword ? 'text' : 'password'}
        id={`${name}-input`}
        name={name}
        value={value}
        onChange={onChange}
      />
      <button
        type='button'
        className='absolute'
        onClick={() => setShowPassword(!showPassword)}
      >
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
      </button>
    </div>
  );
}

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default PasswordInput;
