import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainContext } from '../context';
import { login } from '../api';
import { inputValidation, statusCodes } from '../utils';

import { InputGroup } from '../components';
import logo from '../assets/logo_color.svg';
import '../styles/Login.css';

function Login() {
  const { isLoading, setIsLoading, message, setMessage, setShowMessage, setUser } =
    useContext(MainContext);

  const [inputs, setInputs] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const { email, password } = inputs;
    const { data, status } = await login(email, password);

    if (status === statusCodes.OK) {
      setUser(data);
      navigate('/main');
    } else {
      setMessage(data.message);
      setShowMessage(true);
    }

    setIsLoading(false);
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
        <button
          type='button'
          onClick={() => {
            navigate('/register');
          }}
        >
          Registrar
        </button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}

export default Login;
