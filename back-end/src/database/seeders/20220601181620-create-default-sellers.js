'use strict';
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Sellers', [
      {
        user_id: 3,
        name: 'Distribuidora de bebidas',
        category: 'Bebidas',
      },
      {
        user_id: 4,
        name: 'Hamburgueria Tomate da Selva',
        category: 'Lanches',
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Sellers', null, {});
  },
};
