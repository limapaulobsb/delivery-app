'use strict';
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('SalesProducts', [
      {
        sale_id: 1,
        product_id: 1,
        quantity: 24,
      },
      {
        sale_id: 1,
        product_id: 2,
        quantity: 2,
      },
      {
        sale_id: 1,
        product_id: 4,
        quantity: 2,
      },
      {
        sale_id: 1,
        product_id: 5,
        quantity: 2,
      },
      {
        sale_id: 2,
        product_id: 1,
        quantity: 5,
      },
      {
        sale_id: 2,
        product_id: 3,
        quantity: 1,
      },
      {
        sale_id: 3,
        product_id: 7,
        quantity: 2,
      },
      {
        sale_id: 3,
        product_id: 10,
        quantity: 1,
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('SalesProducts', null, {});
  },
};
