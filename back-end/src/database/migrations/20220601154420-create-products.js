'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(5, 2),
      },
      image_url: {
        allowNull: false,
        type: Sequelize.STRING(200),
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Products');
  },
};
