'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prjt_source_percent_total', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_id: {
        type: Sequelize.STRING
      },
      phase: {
        type: Sequelize.STRING
      },
      comm_type: {
        type: Sequelize.STRING
      },
      source_baseline_total: {
        type: Sequelize.REAL
      },
      source_savings_total: {
        type: Sequelize.REAL
      },
      percent_total: {
        type: Sequelize.REAL
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prjt_source_percent_total');
  }
};