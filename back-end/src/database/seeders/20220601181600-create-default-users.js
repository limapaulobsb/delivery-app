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
        name: 'Igor Rocha',
        email: 'igorrm@gmail.com',
        password: '4297f44b13955235245b2497399d7a93',
        role: 'customer',
      },
      {
        name: 'Maria José',
        email: 'mariajose@deliveryapp.com',
        password: '4297f44b13955235245b2497399d7a93',
        role: 'seller',
      },
      {
        name: 'Danielen Cestari',
        email: 'danielen.cestari@gmail.com',
        password: '4297f44b13955235245b2497399d7a93',
        role: 'admin',
      },
      {
        name: 'Eduardo Sá Carneiro',
        email: 'edusacarneiro@gmail.com',
        password: '4297f44b13955235245b2497399d7a93',
        role: 'admin',
      },
      {
        name: 'Carolina Pereira',
        email: 'carolinadacosta1997@gmail.com',
        password: '4297f44b13955235245b2497399d7a93',
        role: 'admin',
      },
      {
        name: 'Thales Freitas',
        email: 'thalessilva.tv@gmail.com',
        password: '4297f44b13955235245b2497399d7a93',
        role: 'admin',
      },
      {
        name: 'Paulo Henrique Lima',
        email: 'limapaulobsb@gmail.com',
        password: '4297f44b13955235245b2497399d7a93',
        role: 'admin',
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
