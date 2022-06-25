import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as api from '../api';
import { statusCodes } from '../utils';

const MainContext = createContext();
const localUser = JSON.parse(localStorage.getItem('user'));

export function MainProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [user, setUser] = useState(localUser || {});

  const makeRequest = useCallback(
    async (request, body, successCode, successFn) => {
      setIsLoading(true);
      const { status, data } = await request({ body, token: user.token });
      setIsLoading(false);
      if (status === successCode) {
        successFn(data);
        return 1;
      }
      setMessage(data.message);
      setShowMessage(true);
      return 0;
    },
    [user.token]
  );

  const login = useCallback(
    async (body) => {
      const successFn = (data) => setUser(data);
      return makeRequest(api.login, body, statusCodes.OK, successFn);
    },
    [makeRequest]
  );

  const register = useCallback(
    async (body) => {
      const successFn = async () => login(body);
      return makeRequest(api.createUser, body, statusCodes.CREATED, successFn);
    },
    [login, makeRequest]
  );

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
    makeRequest,
    login,
    register,
  };

  return <MainContext.Provider value={{ ...shared }}>{children}</MainContext.Provider>;
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContext;
