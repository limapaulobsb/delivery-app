import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { MainContext, ProductContext } from '../context';
import '../styles/CartControl.css';

function CartControl({ product }) {
  const { setMessage, setShowMessage } = useContext(MainContext);
  const { cart, setCart } = useContext(ProductContext);
  const index = cart.findIndex(({ product: { id } }) => id === product.id);
  const existsInCart = index !== -1;
  const quantityInCart = existsInCart ? cart[index].quantity : 0;
  const [quantity, setQuantity] = useState(quantityInCart);

  const handleChange = ({ target: { value } }) => {
    if (value) {
      setQuantity(parseInt(value));
    }
  };

  const handleClick = () => {
    const updatedCart = [...cart];
    if (existsInCart && quantity > 0) {
      updatedCart[index].quantity = quantity;
      setMessage('Quantidade de itens alterada');
    } else if (existsInCart) {
      updatedCart.splice(index, 1);
      setMessage('Item(ns) removido(s) do carrinho');
    } else {
      updatedCart.push({ product, quantity });
      setMessage('Item(ns) adicionado(s) ao carrinho');
    }
    setCart(updatedCart);
    setShowMessage(true);
  };

  const renderCartButton = () => {
    const isDisabled =
      (!existsInCart && quantity === 0) || (existsInCart && quantity === quantityInCart);

    let label = 'Adicionar';

    if (existsInCart && quantity > 0) {
      label = 'Alterar';
    } else if (existsInCart) {
      label = 'Remover';
    }

    return (
      <button
        type='button'
        className='classic'
        onClick={handleClick}
        disabled={isDisabled}
      >
        {label}
      </button>
    );
  };

  return (
    <div className='cart-control'>
      <div>
        <button
          type='button'
          className='control'
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity === 0}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <input
          type='number'
          value={quantity}
          min={0}
          onChange={handleChange}
        />
        <button
          type='button'
          className='control'
          onClick={() => setQuantity(quantity + 1)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {renderCartButton()}
    </div>
  );
}

CartControl.propTypes = {
  product: PropTypes.object.isRequired,
};

export default CartControl;
