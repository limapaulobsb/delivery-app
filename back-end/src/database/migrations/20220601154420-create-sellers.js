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
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      image_url: {
        type: Sequelize.STRING,
        defaultValue: 'http://localhost:3001/images/NotFound.png',
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Sellers');
  },
};
