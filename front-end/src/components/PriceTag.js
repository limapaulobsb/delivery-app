import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import '../styles/PriceTag.css';

function PriceTag({ className, price = 0 }) {
  return (
    <div className={cx('price-tag', className)}>
      <span>R$</span>
      <span>{price.toLocaleString().replace('.', ',')}</span>
    </div>
  );
}

PriceTag.propTypes = {
  className: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default PriceTag;
