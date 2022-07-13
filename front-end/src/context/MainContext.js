import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import api from '../api';
import { statusCodes } from '../utils';

// Provides general states and user related data and methods
const MainContext = createContext();

export function MainProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) ?? {});

  const setAndShow = (string) => {
    setMessage(string);
    setShowMessage(true);
  };

  // Generic function that prepares a request.
  // If successful, execute the passed function, otherwise show an error message.
  const makeRequest = useCallback(
    async (apiRequest, payload, successCode, successFn) => {
      setIsLoading(true);
      const { status, data } = await apiRequest({ ...payload, token: user.token });
      setIsLoading(false);

      if (status === successCode) {
        successFn(data);
        return true;
      }

      setAndShow(data.message);
      return false;
    },
    [user.token]
  );

  // Request functions
  const login = useCallback(
    async (body) => {
      const successFn = (data) => setUser(data);
      return makeRequest(api.login, { body }, statusCodes.OK, successFn);
    },
    [makeRequest]
  );

  const changePassword = useCallback(
    async (verification, body, id = user.id) => {
      const loginOk = await login({ email: user.email, password: verification });
      if (loginOk) {
        const successFn = () => setAndShow('Senha alterada');
        return makeRequest(api.changePassword, { body, id }, statusCodes.OK, successFn);
      }
      return false;
    },
    [login, makeRequest, user.email, user.id]
  );

  const deleteUser = useCallback(
    async (verification, id = user.id) => {
      const loginOk = await login({ email: user.email, password: verification });
      if (loginOk) {
        const successFn = () => setAndShow('Conta removida');
        return makeRequest(api.deleteUser, { id }, statusCodes.OK, successFn);
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

  const updateUser = useCallback(
    async (verification, body, id = user.id) => {
      const loginOk = await login({ email: user.email, password: verification });
      if (loginOk) {
        const successFn = async () => {
          await login({ email: body.email, password: verification });
          setAndShow('Dados alterados');
        };
        return makeRequest(api.updateUser, { body, id }, statusCodes.OK, successFn);
      }
      return false;
    },
    [login, makeRequest, user.email, user.id]
  );

  // Keeps localStorage up to date with user data
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const shared = {
    changePassword,
    deleteUser,
    isLoading,
    login,
    makeRequest,
    message,
    register,
    setAndShow,
    setMessage,
    setShowMessage,
    setShowModal,
    setUser,
    showMessage,
    showModal,
    updateUser,
    user,
  };

  return <MainContext.Provider value={{ ...shared }}>{children}</MainContext.Provider>;
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainContext;
