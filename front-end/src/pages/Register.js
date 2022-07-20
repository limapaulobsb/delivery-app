import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { MainContext } from '../context';
import { useValidation } from '../hooks';
import { InputGroup } from '../components';
import logo from '../assets/logo_color_full.png';

function Register() {
  const { isLoading, register } = useContext(MainContext);

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmation: '',
  });

  const navigate = useNavigate();
  const [validation] = useValidation([inputs]);

  // Input handler
  const handleChange = ({ target: { name, value } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  // Execute the registration and if successful redirect to the appropriate page
  const handleSubmit = async (event) => {
    event.preventDefault();
    const registerOk = await register(inputs);
    if (registerOk) {
      navigate('/sellers');
    }
  };

  return (
    <main className='login'>
      <img src={logo} alt='Logo' />
      <h1>Delivery App</h1>
      <form onSubmit={handleSubmit}>
        <button
          type='button'
          className='login__go-back-button'
          onClick={() => navigate('/login')}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h2>Cadastro</h2>
        <InputGroup label='Nome completo:' name='name' onChange={handleChange} />
        <InputGroup label='E-mail:' name='email' onChange={handleChange} />
        <InputGroup
          type='password'
          label='Senha:'
          name='password'
          onChange={handleChange}
        />
        <InputGroup
          type='password'
          label='Confirme sua senha:'
          name='confirmation'
          onChange={handleChange}
        />
        <button type='submit' className='gradient-button' disabled={!validation}>
          {isLoading ? <div className='loader' /> : 'Cadastrar'}
        </button>
      </form>
    </main>
  );
}

export default Register;
