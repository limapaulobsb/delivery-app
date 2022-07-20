import React from 'react';
import PropTypes from 'prop-types';

function PriceTag({ className, price }) {
  return (
    <span className={className}>
      <span>R$</span>
      <span>{Number(price).toFixed(2).replace('.', ',')}</span>
    </span>
  );
}

PriceTag.propTypes = {
  className: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default PriceTag;
