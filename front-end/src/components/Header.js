import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUserAlt } from '@fortawesome/free-solid-svg-icons';

import { MainContext, ProductContext } from '../context';
import PriceTag from './PriceTag';
import logo from '../assets/logo_white.png';
import '../styles/Header.css';

function Header() {
  const { setUser, user } = useContext(MainContext);
  const { cartTotal, setCart } = useContext(ProductContext);
  const navigate = useNavigate();

  const logout = () => {
    setUser({});
    setCart([]);
    navigate('/login');
  };

  return (
    <header>
      <div className='nav-bar'>
        <div>
          <div className='logo-container'>
            <img src={logo} alt='Logo' />
          </div>
          <h2>Delivery App</h2>
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
          <Link to='/profile'>
            <FontAwesomeIcon icon={faUserAlt} className='icon' />
            <span>{user.email}</span>
          </Link>
          <button type='button' className='color red' onClick={logout}>
            Sair
          </button>
        </div>
        <div>
          <FontAwesomeIcon icon={faCartShopping} className='icon' />
          <PriceTag price={cartTotal} />
          <button
            type='button'
            className='color yellow'
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
