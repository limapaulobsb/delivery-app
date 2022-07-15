'use strict';
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Sales', [
      {
        seller_id: 1,
        user_id: 1,
        total_price: 1375.40,
        date: new Date(),
        delivery_address: 'SQS 217, bloco Z, apartamento 701',
        status: 'Pendente',
      },
      {
        seller_id: 1,
        user_id: 5,
        total_price: 139.90,
        date: new Date(),
        delivery_address: 'Octogonal 4, Bloco B, apartamento 308',
        status: 'Pendente',
      },
      {
        seller_id: 2,
        user_id: 5,
        total_price: 76,
        date: new Date(),
        delivery_address: 'Octogonal 4, Bloco B, apartamento 308',
        status: 'Pendente',
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Sales', null, {});
  },
};
