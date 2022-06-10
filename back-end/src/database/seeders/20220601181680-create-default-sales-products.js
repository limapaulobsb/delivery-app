'use strict';
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('SalesProducts', [
      {
        sale_id: 1,
        product_id: 7,
        quantity: 1,
      },
      {
        sale_id: 2,
        product_id: 2,
        quantity: 10,
      },
      {
        sale_id: 2,
        product_id: 3,
        quantity: 10,
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('SalesProducts', null, {});
  },
};
