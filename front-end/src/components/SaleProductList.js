import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { SellerContext } from '../context';
import CartControl from './CartControl';
import PriceTag from './PriceTag';
import '../styles/SaleProductList.css';

function SaleProductList({ products }) {
  const { sellers } = useContext(SellerContext);
  const { pathname } = useLocation();

  const DELIVERY_FEE = 10;
  const SERVICE_FEE = 2.99;
  const name = sellers.find(({ id }) => id === products[0].product.sellerId)?.name;

  const total = products.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  );

  // Render functions
  const renderProducts = () => {
    return products.map(({ product, quantity }) => {
      return (
        <li key={product.id}>
          <div>
            <div>{product.name}</div>
            <PriceTag price={product.price * quantity} />
          </div>
          {pathname === '/checkout' ? (
            <CartControl product={product} />
          ) : (
            <div>{`Qde: ${quantity}`}</div>
          )}
        </li>
      );
    });
  };

  // Main render
  return (
    <section className='sale-product-list'>
      <h3>{name}</h3>
      <ol>{renderProducts()}</ol>
      <div>
        <span>Taxa de entrega: </span>
        <PriceTag price={DELIVERY_FEE} />
      </div>
      <div>
        <span>Taxa de serviço: </span>
        <PriceTag price={SERVICE_FEE} />
      </div>
      <div>
        <span>Total: </span>
        <PriceTag price={total + DELIVERY_FEE + SERVICE_FEE} />
      </div>
    </section>
  );
}

SaleProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default SaleProductList;
