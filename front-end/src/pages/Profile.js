import React, { useContext, useState } from 'react';
import md5 from 'md5';

import { MainContext } from '../context';
import { useValidation } from '../hooks';
import { Header, InputGroup } from '../components';
import '../styles/Profile.css';

function Profile() {
  const { user } = useContext(MainContext);

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmation: '',
  });

  const { name, email, password, confirmation } = inputs;

  const validation = useValidation([
    { name, email },
    { password, confirmation },
  ]);

  const hash = md5(user.email).toString();
  const gravatarURL = `https://www.gravatar.com/avatar/${hash}?s=180`;

  const handleChange = ({ target: { name, value } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <main className='profile-page'>
      <Header />
      <img src={gravatarURL} alt='Imagem do perfil' />
      <h4>{user.name}</h4>
      <span>&#127775; &#127775; &#127775; &#127775; &#127775;</span>
      <section>
        <h3>Alterar dados</h3>
        <form>
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
        <form>
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
        <button type='button' className='gradient'>
          Deletar
        </button>
      </section>
    </main>
  );
}

export default Profile;
