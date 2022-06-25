import React, { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import * as api from '../api';
import { statusCodes } from '../utils';
import MainContext from './MainContext';

const SellerContext = createContext();

export function SellerProvider({ children }) {
  const { makeRequest } = useContext(MainContext);
  const [sellers, setSellers] = useState([]);

  const getSellers = useCallback(async () => {
    const successFn = (data) => setSellers(data);
    return makeRequest(api.findSellers, {}, statusCodes.OK, successFn);
  }, [makeRequest]);

  const shared = {
    sellers,
    setSellers,
    getSellers,
  };

  return (
    <SellerContext.Provider value={{ ...shared }}>{children}</SellerContext.Provider>
  );
}

SellerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SellerContext;
