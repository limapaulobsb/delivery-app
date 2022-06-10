'use strict';
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Sales', [
      {
        user_id: 1,
        seller_id: 1,
        total_price: 64.9,
        date: new Date(),
        delivery_address: 'Rua Tal, número 175',
        status: 'Entregue',
      },
      {
        user_id: 2,
        seller_id: 1,
        total_price: 100,
        date: new Date(),
        delivery_address: 'SQS 217, bloco A, apartamento 502',
        status: 'Pendente',
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Sales', null, {});
  },
};
