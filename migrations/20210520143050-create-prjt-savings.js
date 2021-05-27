'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prjt_savings_test', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      project_id: {
        type: Sequelize.STRING,
      },
      phase: {
        type: Sequelize.STRING,      
      },
      commodity: {
        type: Sequelize.STRING,
      },
      unit: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.REAL
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prjt_savings_test');
  }
};