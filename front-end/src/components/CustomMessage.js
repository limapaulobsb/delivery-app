import React, { useContext, useEffect, useRef } from 'react';
import cx from 'classnames';

import { MainContext } from '../context';

function CustomMessage() {
  const { message, showMessage, setShowMessage } = useContext(MainContext);
  const timeoutRef = useRef();

  useEffect(() => {
    if (showMessage) {
      timeoutRef.current = setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [showMessage, setShowMessage]);

  return (
    <div className={cx('custom-message-container', { visible: showMessage })}>
      <span>{message}</span>
    </div>
  );
}

export default CustomMessage;
