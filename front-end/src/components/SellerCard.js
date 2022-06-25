import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/SellerCard.css';

function SellerCard({ id, name, category, imageUrl }) {
  const navigate = useNavigate();

  return (
    <li
      role='button'
      tabIndex='0'
      className='seller-card'
      aria-label={name}
      onClick={() => navigate(`/sellers/${id}/products`)}
    >
      <img src={imageUrl} alt='' />
      <h4>{name}</h4>
      <h5>{category}</h5>
    </li>
  );
}

SellerCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  category: PropTypes.string,
  imageUrl: PropTypes.string,
}.isRequired;

export default SellerCard;
