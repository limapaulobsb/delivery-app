import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { MainContext } from '../context';
import Modal from './Modal';
import PasswordInput from './PasswordInput';
import '../styles/PasswordVerification.css';

function PasswordVerification({ confirmFn }) {
  const { setShowModal } = useContext(MainContext);
  const [verification, setVerification] = useState('');

  // Close the modal and execute the passed function
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(false);
    setVerification('');
    confirmFn(verification);
  };

  return (
    <Modal>
      <form className='password-verification' onSubmit={handleSubmit}>
        <p>Para prosseguir, informe sua senha:</p>
        <PasswordInput
          name='verification'
          value={verification}
          onChange={({ target: { value } }) => setVerification(value)}
        />
        <div>
          <button type='submit' className='color-button--blue' disabled={!verification}>
            Confirmar
          </button>
          <button
            type='button'
            className='color-button--red'
            onClick={() => {
              setShowModal(false);
              setVerification('');
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}

PasswordVerification.propTypes = {
  confirmFn: PropTypes.func.isRequired,
};

export default PasswordVerification;
