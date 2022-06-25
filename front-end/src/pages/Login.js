import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainContext } from '../context';
import { inputValidation } from '../utils';
import { InputGroup } from '../components';
import logo from '../assets/logo_color_full.png';
import '../styles/Login.css';

function Login() {
  const { isLoading, login } = useContext(MainContext);
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginOk = await login(inputs);
    if (loginOk) {
      navigate('/sellers');
    }
  };

  return (
    <main className='login-page'>
      <img src={logo} alt='Logo' />
      <h1>Delivery App</h1>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <InputGroup name='email' onChange={handleChange}>
          E-mail:
        </InputGroup>
        <InputGroup type='password' name='password' onChange={handleChange}>
          Senha:
        </InputGroup>
        <span>Esqueceu a senha?</span>
        <button type='submit' disabled={!inputValidation(inputs)}>
          {isLoading ? <div className='loader' /> : 'Entrar'}
        </button>
        <button type='button' onClick={() => navigate('/register')}>
          Novo cadastro
        </button>
      </form>
    </main>
  );
}

export default Login;
