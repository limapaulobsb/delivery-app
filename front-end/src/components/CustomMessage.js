import React, { useContext, useEffect, useRef } from 'react';
import cx from 'classnames';

import { MainContext } from '../context';
import '../styles/CustomMessage.css';

function CustomMessage() {
  const { message, showMessage, setShowMessage } = useContext(MainContext);
  const timeoutRef = useRef();

  useEffect(() => {
    if (showMessage) {
      timeoutRef.current = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [message, showMessage, setShowMessage]);

  return (
    <div className={cx('custom-message', { visible: showMessage })}>
      <span>{message}</span>
    </div>
  );
}

export default CustomMessage;
