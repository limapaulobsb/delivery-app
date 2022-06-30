import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import MainContext from './MainContext';
import * as api from '../api';
import { statusCodes } from '../utils';

const ProductContext = createContext();

const localCart = JSON.parse(localStorage.getItem('cart'));

export function ProductProvider({ children }) {
  const { makeRequest } = useContext(MainContext);
  const [cart, setCart] = useState(localCart || []);
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(
    async (id) => {
      const successFn = (data) => setProducts(data);
      return makeRequest(api.findSellerProducts, { id }, statusCodes.OK, successFn);
    },
    [makeRequest]
  );

  const cartTotal = () => {
    return cart.reduce((acc, { quantity, product }) => acc + quantity * product.price, 0);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const shared = {
    cart,
    setCart,
    products,
    setProducts,
    getProducts,
    cartTotal,
  };

  return (
    <ProductContext.Provider value={{ ...shared }}>{children}</ProductContext.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductContext;
