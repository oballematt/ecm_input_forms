'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prjt_metadata', {
      project_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      building: {
        type: Sequelize.STRING
      },
      neasure_type: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      staff_lead: {
        type: Sequelize.STRING
      },
      staff_colead: {
        type: Sequelize.STRING
      },
      analyst: {
        type: Sequelize.STRING
      },
      project_description: {
        type: Sequelize.TEXT
      },
      nonenergy_benefits: {
        type: Sequelize.TEXT
      },
      baseline_start_date: {
        type: Sequelize.DATE
      },
      reporting_period_start_date: {
        type: Sequelize.DATE
      },
      length_baseline_period_days: {
        type: Sequelize.INTEGER
      },
      length_reporting_period_days: {
        type: Sequelize.INTEGER
      },
      baseline_end_date: {
        type: Sequelize.DATE
      },
      reporting_period_end_date: {
        type: Sequelize.DATE
      },
      fiscal_year: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prjt_metadata');
  }
};