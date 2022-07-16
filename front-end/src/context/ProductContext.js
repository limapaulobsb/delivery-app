import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import MainContext from './MainContext';
import api from '../api';
import { statusCodes } from '../utils';

// Provides product related data and methods
const ProductContext = createContext();

export function ProductProvider({ children }) {
  const { makeRequest } = useContext(MainContext);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) ?? []);
  const [products, setProducts] = useState([]);

  const cartTotal = useMemo(
    () => cart.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0),
    [cart]
  );

  // Request functions
  const getProducts = useCallback(
    async (id) => {
      const successFn = (data) => setProducts(data);
      return makeRequest(api.findSellerProducts, { id }, statusCodes.OK, successFn);
    },
    [makeRequest]
  );

  // Keeps localStorage up to date with cart data
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const shared = {
    cart,
    cartTotal,
    getProducts,
    products,
    setCart,
  };

  return (
    <ProductContext.Provider value={{ ...shared }}>{children}</ProductContext.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductContext;
