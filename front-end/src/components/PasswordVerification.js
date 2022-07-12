import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { MainContext } from '../context';
import Modal from './Modal';
import PasswordInput from './PasswordInput';
import '../styles/PasswordVerification.css';

function PasswordVerification({ confirmFn }) {
  const { setShowModal } = useContext(MainContext);
  const [password, setPassword] = useState('');

  return (
    <Modal>
      <div className='password-verification'>
        <p>Para prosseguir, informe sua senha:</p>
        <PasswordInput
          name='verification'
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <div>
          <button
            type='button'
            className='classic'
            onClick={async () => {
              setShowModal(false);
              setPassword('');
              await confirmFn(password);
            }}
            disabled={!password}
          >
            Confirmar
          </button>
          <button
            type='button'
            className='classic dark'
            onClick={() => {
              setShowModal(false);
              setPassword('');
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
}

PasswordVerification.propTypes = {
  confirmFn: PropTypes.func.isRequired,
};

export default PasswordVerification;
