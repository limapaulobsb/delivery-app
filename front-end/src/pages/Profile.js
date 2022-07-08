import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';

import { MainContext, ProductContext } from '../context';
import { useValidation } from '../hooks';
import { Header, InputGroup, PasswordVerification } from '../components';
import '../styles/Profile.css';

function Profile() {
  const { deleteUser, setShowModal, user, setUser } = useContext(MainContext);
  const { setCart } = useContext(ProductContext);
  const [confirmFn, setConfirmFn] = useState(() => () => {});

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmation: '',
  });

  const navigate = useNavigate();

  const validation = useValidation([
    { name: inputs.name, email: inputs.email },
    { password: inputs.password, confirmation: inputs.confirmation },
  ]);

  const hash = md5(user.email);
  const gravatarURL = `https://www.gravatar.com/avatar/${hash}?s=160`;

  const handleChange = ({ target: { name, value } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDelete = async (verification) => {
    const deleteOk = await deleteUser(verification);
    if (deleteOk) {
      setUser({});
      setCart([]);
      navigate('/login');
    }
  };

  const handlePassword = (verification) => {
    console.log(verification);
  };

  const handleUpdate = () => {};

  return (
    <main className='profile-page'>
      <Header />
      <img src={gravatarURL} alt='Imagem do perfil' />
      <h4>{user.name}</h4>
      <span>&#127775; &#127775; &#127775; &#127775; &#127775;</span>
      <section>
        <h3>Alterar dados</h3>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleUpdate();
          }}
        >
          <InputGroup name='name' onChange={handleChange}>
            Nome completo:
          </InputGroup>
          <InputGroup name='email' onChange={handleChange}>
            E-mail:
          </InputGroup>
          <button type='submit' className='gradient' disabled={!validation[0]}>
            Alterar
          </button>
        </form>
      </section>
      <section>
        <h3>Alterar senha</h3>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setConfirmFn(() => handlePassword);
            setShowModal(true);
          }}
        >
          <InputGroup type='password' name='password' onChange={handleChange}>
            Nova senha:
          </InputGroup>
          <InputGroup type='password' name='confirmation' onChange={handleChange}>
            Confirme sua nova senha:
          </InputGroup>
          <button type='submit' className='gradient' disabled={!validation[1]}>
            Alterar
          </button>
        </form>
      </section>
      <section>
        <h3>Deletar conta</h3>
        <p>Nós ficaremos muito tristes em ver você partir. &#128533;</p>
        <p>Lembre-se de que este processo é irreversível.</p>
        <button
          type='button'
          className='gradient'
          onClick={() => {
            setConfirmFn(() => handleDelete);
            setShowModal(true);
          }}
        >
          Deletar
        </button>
      </section>
      <PasswordVerification confirmFn={confirmFn} />
    </main>
  );
}

export default Profile;
