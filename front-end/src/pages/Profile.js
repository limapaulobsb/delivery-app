import React, { useContext } from 'react';
import md5 from 'md5';

import { MainContext } from '../context';
import { Header, InputGroup } from '../components';

function Profile() {
  const { user } = useContext(MainContext);

  const hash = md5(user.email).toString();
  const gravatarURL = `https://www.gravatar.com/avatar/${hash}?s=240`;

  return (
    <main>
      <Header />
      <img src={gravatarURL} className='gravatar-img' alt='Imagem do perfil' />
      <h4>{user.name}</h4>
      <section>
        <h3>Alterar dados</h3>
        <form>
          <InputGroup>Nome completo:</InputGroup>
          <InputGroup>E-mail:</InputGroup>
          <button type='submit' className='gradient' disabled>
            Alterar
          </button>
        </form>
      </section>
      <section>
        <h3>Alterar senha</h3>
        <form>
          <InputGroup>Nova senha:</InputGroup>
          <InputGroup>Confirme sua senha:</InputGroup>
          <InputGroup>Senha atual:</InputGroup>
          <button type='submit' className='gradient' disabled>
            Alterar
          </button>
        </form>
      </section>
      <section>
        <h3>Deletar conta</h3>
        <p>Nós ficaremos muito tristes em ver você partir. &#128533;&#128148;</p>
        <p>Este processo é irreversível. Se tiver certeza, confirme os dados abaixo.</p>
        <form>
          <InputGroup>E-mail:</InputGroup>
          <InputGroup>Senha:</InputGroup>
          <button type='submit' className='gradient' disabled>
            Deletar
          </button>
        </form>
      </section>
    </main>
  );
}

export default Profile;
