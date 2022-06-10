'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sellers', {
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
      category: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      image_url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Sellers');
  },
};
