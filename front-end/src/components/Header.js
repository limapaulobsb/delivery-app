import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUserAlt } from '@fortawesome/free-solid-svg-icons';

import { MainContext, ProductContext } from '../context';
import PriceTag from './PriceTag';
import logo from '../assets/logo_white.png';
import '../styles/Header.css';

function Header() {
  const { user, setUser } = useContext(MainContext);
  const { cartTotal, setCart } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <header>
      <div className='nav-bar'>
        <div>
          <div className='logo-container'>
            <img src={logo} alt='Logo' />
          </div>
          <div>
            <h1>Delivery App</h1>
          </div>
        </div>
        <nav>
          <NavLink to='/sellers' className='nav-link'>
            Produtos
          </NavLink>
          <NavLink to='/orders' className='nav-link'>
            Pedidos
          </NavLink>
        </nav>
      </div>
      <div className='aux-bar'>
        <div>
          <FontAwesomeIcon icon={faUserAlt} className='icon' />
          <span>{user.email}</span>
          <button
            type='button'
            className='classic dark'
            onClick={() => {
              setUser({});
              setCart([]);
              navigate('/login');
            }}
          >
            Sair
          </button>
        </div>
        <div>
          <FontAwesomeIcon icon={faCartShopping} className='icon' />
          <PriceTag price={cartTotal} />
          <button
            type='button'
            className='classic yellow'
            onClick={() => navigate('/checkout')}
            disabled={cartTotal === 0}
          >
            Ver carrinho
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
