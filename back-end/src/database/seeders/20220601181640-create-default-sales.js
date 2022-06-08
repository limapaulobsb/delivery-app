'use strict';
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Sales', [
      {
        customer_id: 1,
        seller_id: 3,
        total_price: 64.9,
        delivery_address: 'Rua Tal, número 175',
        sale_date: new Date(),
        status: 'Entregue',
      },
      {
        customer_id: 2,
        seller_id: 3,
        total_price: 100,
        delivery_address: 'SQS 201, bloco A, apartamento 502',
        sale_date: new Date(),
        status: 'Pendente',
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Sales', null, {});
  },
};
