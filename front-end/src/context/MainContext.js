import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as api from '../api';
import { statusCodes } from '../utils';

const MainContext = createContext();

export function MainProvider({ children }) {
  const localUser = JSON.parse(localStorage.getItem('user'));

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [user, setUser] = useState(localUser || {});

  const login = async ({ email, password }) => {
    setIsLoading(true);
    const { data, status } = await api.login(email, password);
    setIsLoading(false);
    if (status === statusCodes.OK) {
      setUser(data);
      return 1;
    }
    setMessage(data.message);
    setShowMessage(true);
    return 0;
  };

  const register = async ({ name, email, password }) => {
    setIsLoading(true);
    const { data, status } = await api.createUser(name, email, password);
    setIsLoading(false);
    if (status === statusCodes.CREATED) {
      await login({ email, password });
      return 1;
    }
    setMessage(data.message);
    setShowMessage(true);
    return 0;
  };

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
    login,
    register,
  };

  return <MainContext.Provider value={{ ...shared }}>{children}</MainContext.Provider>;
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContext;
