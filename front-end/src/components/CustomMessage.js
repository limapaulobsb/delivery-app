import React, { useContext, useEffect, useRef } from 'react';
import cx from 'classnames';

import { MainContext } from '../context';
import '../styles/CustomMessage.css';

function CustomMessage() {
  const { message, setShowMessage, showMessage } = useContext(MainContext);
  const timeoutRef = useRef();

  // Sets a timeout to hide the custom message.
  // A reference is required to do the cleanup correctly.
  useEffect(() => {
    if (showMessage) {
      timeoutRef.current = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [message, setShowMessage, showMessage]);

  return (
    <div className={cx('custom-message', { visible: showMessage })}>
      <span>{message}</span>
    </div>
  );
}

export default CustomMessage;
