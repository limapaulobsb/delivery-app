import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import MainContext from './MainContext';
import api from '../api';
import { statusCodes } from '../utils';

const SellerContext = createContext();

export function SellerProvider({ children }) {
  const { makeRequest } = useContext(MainContext);
  const [sellers, setSellers] = useState([]);

  const getSellers = useCallback(async () => {
    const successFn = (data) => setSellers(data);
    return makeRequest(api.findSellers, {}, statusCodes.OK, successFn);
  }, [makeRequest]);

  useEffect(() => {
    getSellers();
  }, [getSellers]);

  const shared = {
    getSellers,
    sellers,
    setSellers,
  };

  return (
    <SellerContext.Provider value={{ ...shared }}>{children}</SellerContext.Provider>
  );
}

SellerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SellerContext;
