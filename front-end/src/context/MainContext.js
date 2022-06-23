import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const MainContext = createContext();

export function MainProvider({ children }) {
  const localUser = JSON.parse(localStorage.getItem('user'));

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [user, setUser] = useState(localUser || {});

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const shared = {
    isLoading,
    setIsLoading,
    message,
    setMessage,
    showMessage,
    setShowMessage,
    user,
    setUser,
  };

  return <MainContext.Provider value={{ ...shared }}>{children}</MainContext.Provider>;
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContext;
