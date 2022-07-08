import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as api from '../api';
import { statusCodes } from '../utils';

const MainContext = createContext();

export function MainProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const localUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(localUser || {});

  const makeRequest = useCallback(
    async (request, payload, successCode, successFn) => {
      setIsLoading(true);
      const { status, data } = await request({ ...payload, token: user.token });
      setIsLoading(false);
      if (status === successCode) {
        await successFn(data);
        return true;
      }
      setMessage(data.message);
      setShowMessage(true);
      return false;
    },
    [user.token]
  );

  const login = useCallback(
    async (body) => {
      const successFn = (data) => setUser(data);
      return makeRequest(api.login, { body }, statusCodes.OK, successFn);
    },
    [makeRequest]
  );

  const deleteUser = useCallback(
    async (verification) => {
      const loginOk = await login({ email: user.email, password: verification });
      if (loginOk) {
        const successFn = () => {
          setMessage('Conta removida');
          setShowMessage(true);
        };
        return makeRequest(api.deleteUser, { id: user.id }, statusCodes.OK, successFn);
      }
      return false;
    },
    [login, makeRequest, user.email, user.id]
  );

  const register = useCallback(
    async (body) => {
      const successFn = async () => login(body);
      return makeRequest(api.createUser, { body }, statusCodes.CREATED, successFn);
    },
    [login, makeRequest]
  );

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const shared = {
    deleteUser,
    isLoading,
    login,
    makeRequest,
    message,
    register,
    setIsLoading,
    setMessage,
    setShowMessage,
    setShowModal,
    setUser,
    showMessage,
    showModal,
    user,
  };

  return <MainContext.Provider value={{ ...shared }}>{children}</MainContext.Provider>;
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContext;
