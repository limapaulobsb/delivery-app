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
      seller_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Sellers',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(8, 2),
      },
      image_url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Products');
  },
};
