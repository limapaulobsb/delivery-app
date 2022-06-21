'use strict';
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Sellers', [
      {
        user_id: 3,
        name: 'Distribuidora de bebidas',
        category: 'Bebidas',
        image_url: 'http://localhost:3001/images/NotFound.png',
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Sellers', null, {});
  },
};
