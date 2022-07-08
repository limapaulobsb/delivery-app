import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';

import { MainContext } from '../context';
import Modal from './Modal';
import '../styles/PasswordVerification.css';

function PasswordVerification({ confirmFn }) {
  const { setShowModal } = useContext(MainContext);
  const inputRef = useRef();

  return (
    <Modal>
      <div className='password-verification'>
        <p>Para prosseguir, informe sua senha:</p>
        <input type='password' ref={inputRef} />
        <div>
          <button
            type='button'
            className='classic'
            onClick={async () => {
              setShowModal(false);
              await confirmFn(inputRef.current.value);
              inputRef.current.value = '';
            }}
          >
            Confirmar
          </button>
          <button
            type='button'
            className='classic dark'
            onClick={() => {
              setShowModal(false);
              inputRef.current.value = '';
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
