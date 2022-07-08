import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import MainContext from '../context/MainContext';
import '../styles/Modal.css';

function Modal({ children }) {
  const { showModal, setShowModal } = useContext(MainContext);

  return (
    <>
      <div className={cx('modal', { visible: showModal })}>{children}</div>
      <div
        className={cx('backdrop', { visible: showModal })}
        onClick={() => setShowModal(false)}
      />
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
