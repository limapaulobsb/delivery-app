'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Users');
  },
};
