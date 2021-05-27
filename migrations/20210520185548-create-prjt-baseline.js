'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prjt_baseline_test', {
     
      project_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      commodity: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      unit: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      value: {
        type: Sequelize.REAL
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prjt_baseline_test');
  }
};