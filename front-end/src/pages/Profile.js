import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';

import { MainContext, ProductContext } from '../context';
import { useValidation } from '../hooks';
import { Header, InputGroup, PasswordVerification } from '../components';
import '../styles/Profile.css';

function Profile() {
  const { changePassword, deleteUser, setShowModal, setUser, updateUser, user } =
    useContext(MainContext);

  const { setCart } = useContext(ProductContext);
  const [confirmFn, setConfirmFn] = useState(() => () => {});

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmation: '',
  });

  const navigate = useNavigate();

  const { name, email, password, confirmation } = inputs;

  const validations = useValidation([
    { [name && 'name']: name, [email && 'email']: email },
    { password, confirmation },
  ]);

  const hash = md5(user.email);
  const gravatarURL = `https://www.gravatar.com/avatar/${hash}?s=160`;

  // Input handler
  const handleChange = ({ target: { name, value } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  // Execute the user removal and if successful redirect to the appropriate page
  const handleDelete = async (verification) => {
    const deleteOk = await deleteUser(verification);
    if (deleteOk) {
      setUser({});
      setCart([]);
      navigate('/login');
    }
  };

  // Execute the password change
  const handlePassword = async (verification) => {
    const updateOk = await changePassword(verification, { password });
    if (updateOk) {
      setInputs({ ...inputs, password: '', confirmation: '' });
    }
  };

  // Execute the user update
  const handleUpdate = async (verification) => {
    const updateOk = await updateUser(verification, {
      name: name || user.name,
      email: email || user.email,
    });
    if (updateOk) {
      setInputs({ ...inputs, name: '', email: '' });
    }
  };

  // Render functions
  const renderDeleteSection = () => {
    return (
      <section>
        <h3>Deletar conta</h3>
        <p>Nós ficaremos muito tristes em ver você partir. &#128533;</p>
        <br />
        <p>Lembre-se de que este processo é irreversível.</p>
        <br />
        <button
          type='button'
          className='gradient-button'
          onClick={() => {
            setConfirmFn(() => handleDelete);
            setShowModal(true);
          }}
        >
          Deletar
        </button>
      </section>
    );
  };

  const renderPasswordSection = () => {
    return (
      <section>
        <h3>Alterar senha</h3>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setConfirmFn(() => handlePassword);
            setShowModal(true);
          }}
        >
          <InputGroup
            type='password'
            label='Nova senha:'
            name='password'
            value={password}
            onChange={handleChange}
          />
          <InputGroup
            type='password'
            label='Confirme sua nova senha:'
            name='confirmation'
            value={confirmation}
            onChange={handleChange}
          />
          <button type='submit' className='gradient-button' disabled={!validations[1]}>
            Alterar
          </button>
        </form>
      </section>
    );
  };

  const renderUpdateSection = () => {
    return (
      <section>
        <h3>Alterar dados</h3>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setConfirmFn(() => handleUpdate);
            setShowModal(true);
          }}
        >
          <InputGroup
            label='Nome completo:'
            name='name'
            value={name}
            onChange={handleChange}
          />
          <InputGroup
            label='E-mail:'
            name='email'
            value={email}
            onChange={handleChange}
          />
          <button type='submit' className='gradient-button' disabled={!validations[0]}>
            Alterar
          </button>
        </form>
      </section>
    );
  };

  // Main render
  return (
    <main className='profile'>
      <Header />
      <img src={gravatarURL} alt='Imagem do perfil' />
      <h4>{user.name}</h4>
      <span className='profile__stars'>
        &#127775; &#127775; &#127775; &#127775; &#127775;
      </span>
      {renderUpdateSection()}
      {renderPasswordSection()}
      {renderDeleteSection()}
      <PasswordVerification confirmFn={confirmFn} />
    </main>
  );
}

export default Profile;
