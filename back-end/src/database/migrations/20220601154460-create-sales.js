'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      seller_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      total_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(11, 2),
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      delivery_address: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      status: {
        type: Sequelize.STRING(20),
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Sales');
  },
};
