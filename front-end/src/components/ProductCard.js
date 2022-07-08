import React from 'react';
import PropTypes from 'prop-types';

import PriceTag from './PriceTag';
import CartControl from './CartControl';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const { name, price, imageUrl } = product;

  return (
    <li className='product-card'>
      <PriceTag className='absolute' price={price} />
      <img src={imageUrl} alt='' />
      <h5>{name}</h5>
      <CartControl product={product} />
    </li>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
