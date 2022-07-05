import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import '../styles/PriceTag.css';

function PriceTag({ className, price }) {
  return (
    <span className={cx('price-tag', className)}>
      <span>R$</span>
      <span>{Number(price).toFixed(2).replace('.', ',')}</span>
    </span>
  );
}

PriceTag.propTypes = {
  className: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default PriceTag;
