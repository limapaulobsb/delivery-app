import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainContext } from '../context';
import { useValidation } from '../hooks';
import { InputGroup } from '../components';
import logo from '../assets/logo_color_full.png';
import '../styles/Login.css';

function Login() {
  const { isLoading, login } = useContext(MainContext);
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [validation] = useValidation([inputs]);

  // Input handler
  const handleChange = ({ target: { name, value } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  // Execute the login and if successful redirect to the appropriate page
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
        <InputGroup label='E-mail:' name='email' onChange={handleChange} />
        <InputGroup
          type='password'
          label='Senha:'
          name='password'
          onChange={handleChange}
        />
        <span>Esqueceu a senha?</span>
        <button type='submit' className='gradient' disabled={!validation}>
          {isLoading ? <div className='loader' /> : 'Entrar'}
        </button>
        <button type='button' className='gradient' onClick={() => navigate('/register')}>
          Novo cadastro
        </button>
      </form>
    </main>
  );
}

export default Login;
