import React, { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import MainContext from './MainContext';
import api from '../api';
import { statusCodes } from '../utils';

// Provides sale related data and methods
const SaleContext = createContext();

export function SaleProvider({ children }) {
  const { makeRequest, user } = useContext(MainContext);
  const [sale, setSale] = useState({});
  const [sales, setSales] = useState([]);

  // Request functions
  const getSale = useCallback(
    async (id) => {
      const successFn = (data) => setSale(data);
      return makeRequest(api.findSale, { id }, statusCodes.OK, successFn);
    },
    [makeRequest]
  );

  const getUserSales = useCallback(
    async (id = user.id) => {
      const successFn = (data) => setSales(data);
      return makeRequest(api.findUserSales, { id }, statusCodes.OK, successFn);
    },
    [makeRequest, user.id]
  );

  const shared = {
    getSale,
    getUserSales,
    sale,
    sales,
  };

  return <SaleContext.Provider value={{ ...shared }}>{children}</SaleContext.Provider>;
}

SaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SaleContext;
