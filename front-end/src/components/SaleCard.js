import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import PriceTag from './PriceTag';
import '../styles/SaleCard.css';

function SaleCard({ sale: { id, totalPrice, date, status } }) {
  const navigate = useNavigate();

  let bgColor = 'bg-blue';

  if (status === 'Pendente') {
    bgColor = 'bg-yellow';
  } else if (status === 'Entregue') {
    bgColor = 'bg-green';
  }

  return (
    <li
      role='button'
      tabIndex='0'
      className='sale-card'
      aria-label={`Pedido ${id}`}
      onClick={() => navigate(`/orders/${id}`)}
    >
      <div>{id.toString().padStart(4, '0')}</div>
      <div>
        <div className={`sale-card__status ${bgColor}`}>{status}</div>
        <div>
          <div className='sale-card__date'>{new Date(date).toLocaleDateString('pt-BR')}</div>
          <div className='sale-card__total'>
            <PriceTag price={totalPrice} />
          </div>
        </div>
      </div>
    </li>
  );
}

SaleCard.propTypes = {
  sale: PropTypes.object.isRequired,
};

export default SaleCard;
