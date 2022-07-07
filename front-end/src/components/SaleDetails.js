import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { SellerContext } from '../context';
import PriceTag from './PriceTag';
import '../styles/SaleDetails.css';
import CartControl from './CartControl';

function SaleDetails({ sellerId, sale: { products, totalPrice } }) {
  const { sellers } = useContext(SellerContext);

  const name = sellers.find(({ id }) => id === sellerId)?.name;
  const DELIVERY_FEE = 10;
  const SERVICE_FEE = 2.99;

  const renderProducts = () => {
    return products.map(({ product, quantity }) => {
      return (
        <li key={product.id}>
          <div>
            <div>{product.name}</div>
            <PriceTag price={product.price * quantity} />
          </div>
          <CartControl product={product} />
        </li>
      );
    });
  };

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
  sellerId: PropTypes.number,
  sale: PropTypes.object,
}.isRequired;

export default SaleDetails;
