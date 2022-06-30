import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

import { MainContext } from '../context';
import { inputValidation } from '../utils';
import { InputGroup } from '../components';
import logo from '../assets/logo_color_full.png';
import '../styles/Login.css';

function Register() {
  const { isLoading, register } = useContext(MainContext);
  const [inputs, setInputs] = useState({ email: '', password: '', confirmation: '' });
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const registerOk = await register(inputs);
    if (registerOk) {
      navigate('/sellers');
    }
  };

  return (
    <main className='login-page'>
      <img src={logo} alt='Logo' />
      <h1>Delivery App</h1>
      <form onSubmit={handleSubmit}>
        <button type='button' className='absolute' onClick={() => navigate('/login')}>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} className='icon' />
        </button>
        <h2>Cadastro</h2>
        <InputGroup name='name' onChange={handleChange}>
          Nome completo:
        </InputGroup>
        <InputGroup name='email' onChange={handleChange}>
          E-mail:
        </InputGroup>
        <InputGroup type='password' name='password' onChange={handleChange}>
          Senha:
        </InputGroup>
        <InputGroup type='password' name='confirmation' onChange={handleChange}>
          Confirme sua senha:
        </InputGroup>
        <button type='submit' className='gradient' disabled={!inputValidation(inputs)}>
          {isLoading ? <div className='loader' /> : 'Cadastrar'}
        </button>
      </form>
    </main>
  );
}

export default Register;
