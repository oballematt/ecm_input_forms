'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prjt_financial_analysis', {
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
      entity: {
        type: Sequelize.STRING
      },
      cash_flow: {
        type: Sequelize.STRING
      },
      imp: {
        type: Sequelize.STRING
      },
      npv: {
        type: Sequelize.DOUBLE
      },
      payback: {
        type: Sequelize.DOUBLE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prjt_financial_analysis');
  }
};