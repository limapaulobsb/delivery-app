import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { MainContext, ProductContext } from '../context';
import '../styles/CartControl.css';

function CartControl({ product }) {
  const { setAndShow } = useContext(MainContext);
  const { cart, setCart } = useContext(ProductContext);

  // Checks if the product already exists in the cart and its quantity
  const index = cart.findIndex(({ product: { id } }) => id === product.id);
  const existsInCart = index !== -1;
  const qtyInCart = existsInCart ? cart[index].qty : 0;

  const [qty, setQty] = useState(qtyInCart);

  // Input handler
  const handleChange = ({ target: { value } }) => {
    if (value) {
      setQty(parseInt(value));
    }
  };

  // Updates cart depending on its state and shows the appropriate message
  const updateCart = () => {
    const updatedCart = [...cart];
    let message = '';
    if (existsInCart && qty > 0) {
      updatedCart[index].qty = qty;
      message = 'Quantidade de itens alterada';
    } else if (existsInCart) {
      updatedCart.splice(index, 1);
      message = 'Item(ns) removido(s) do carrinho';
    } else {
      updatedCart.push({ product, qty });
      message = 'Item(ns) adicionado(s) ao carrinho';
    }
    setCart(updatedCart);
    setAndShow(message);
  };

  // Render functions
  const renderCartButton = () => {
    let label = 'Adicionar';
    if (existsInCart && qty > 0) {
      label = 'Alterar';
    } else if (existsInCart) {
      label = 'Remover';
    }

    return (
      <button
        type='button'
        className='classic'
        onClick={updateCart}
        disabled={(!existsInCart && qty === 0) || (existsInCart && qty === qtyInCart)}
      >
        {label}
      </button>
    );
  };

  // Main render
  return (
    <div className='cart-control'>
      <div>
        <button
          type='button'
          className='control'
          onClick={() => setQty(qty - 1)}
          disabled={qty === 0}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <input type='number' value={qty} min={0} onChange={handleChange} />
        <button type='button' className='control' onClick={() => setQty(qty + 1)}>
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
