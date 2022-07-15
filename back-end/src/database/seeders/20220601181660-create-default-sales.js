'use strict';
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Sales', [
      {
        seller_id: 1,
        user_id: 1,
        total_price: 1340.39,
        date: new Date('1/1/2022'),
        delivery_address: 'SQS 217, bloco Z, apartamento 701',
        status: 'Entregue',
      },
      {
        seller_id: 1,
        user_id: 5,
        total_price: 152.89,
        date: new Date('5/4/2022'),
        delivery_address: 'Octogonal 4, Bloco B, apartamento 308',
        status: 'Entregue',
      },
      {
        seller_id: 2,
        user_id: 5,
        total_price: 88.99,
        date: new Date('7/3/2022'),
        delivery_address: 'Octogonal 4, Bloco B, apartamento 308',
        status: 'Entregue',
      },
      {
        seller_id: 1,
        user_id: 5,
        total_price: 126.89,
        date: new Date(),
        delivery_address: 'Octogonal 4, Bloco B, apartamento 308',
        status: 'Preparando',
      },
      {
        seller_id: 2,
        user_id: 5,
        total_price: 87.99,
        date: new Date(),
        delivery_address: 'Octogonal 4, Bloco B, apartamento 308',
        status: 'Preparando',
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Sales', null, {});
  },
};
