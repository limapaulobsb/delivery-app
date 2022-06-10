'use strict';
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Sellers', [
      {
        user_id: 3,
        category: 'Bebidas',
        name: 'Distribuidora de bebidas',
        image_url: 'http://localhost:3001/images/NotFound.png',
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Sellers', null, {});
  },
};
