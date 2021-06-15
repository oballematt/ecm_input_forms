'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prjt_source_percent_each', {
      project_id: {
        type: Sequelize.STRING
      },
      phase: {
        type: Sequelize.STRING
      },
      commodity: {
        type: Sequelize.STRING
      },
      comm_type: {
        type: Sequelize.STRING
      },
      source_energy_baseline: {
        type: Sequelize.REAL
      },
      source_energy_savings: {
        type: Sequelize.REAL
      },
      savings_percent: {
        type: Sequelize.DOUBLE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prjt_source_percent_each');
  }
};