import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { SellerContext } from '../context';
import CartControl from './CartControl';
import PriceTag from './PriceTag';
import '../styles/SaleDetails.css';

function SaleDetails({ sale: { products, totalPrice }, sellerId }) {
  const { sellers } = useContext(SellerContext);

  const DELIVERY_FEE = 10;
  const SERVICE_FEE = 2.99;
  const name = sellers.find(({ id }) => id === sellerId)?.name;

  // Render functions
  const renderProducts = () => {
    return products.map(({ product, qty }) => {
      return (
        <li key={product.id}>
          <div>
            <div>{product.name}</div>
            <PriceTag price={product.price * qty} />
          </div>
          <CartControl product={product} />
        </li>
      );
    });
  };

  // Main render
  return (
    <section className='sale-details'>
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
        <PriceTag price={totalPrice + DELIVERY_FEE + SERVICE_FEE} />
      </div>
    </section>
  );
}

SaleDetails.propTypes = {
  sale: PropTypes.object.isRequired,
  sellerId: PropTypes.number.isRequired,
};

export default SaleDetails;
