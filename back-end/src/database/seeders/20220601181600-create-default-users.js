'use strict';
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Zé Birita',
        email: 'zebirita@email.com',
        password: '1c37466c159755ce1fa181bd247cb925',
        role: 'customer',
      },
      {
        name: 'Igor Rocha de Moraes',
        email: 'igor@email.com',
        password: '4297f44b13955235245b2497399d7a93',
        role: 'customer',
      },
      {
        name: 'Maria Costa e Silva',
        email: 'maria@email.com',
        password: '4297f44b13955235245b2497399d7a93',
        role: 'seller',
      },
      {
        name: 'José Fernandes de Oliveira',
        email: 'jose@email.com',
        password: '4297f44b13955235245b2497399d7a93',
        role: 'seller',
      },
      {
        name: 'Paulo Henrique Lima',
        email: 'limapaulobsb@gmail.com',
        password: '4297f44b13955235245b2497399d7a93',
        role: 'admin',
      },
      {
        name: 'Vitória Gonçalves de Souza e Lima',
        email: 'viit.gsouza@gmail.com',
        password: '13962f26b05bdcb92c542be519a32320',
        role: 'customer',
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
