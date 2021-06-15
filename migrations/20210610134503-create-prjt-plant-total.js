'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prjt_plant_total', {
      project_id: {
        type: Sequelize.STRING
      },
      phase: {
        type: Sequelize.STRING
      },
      plant_commodity: {
        type: Sequelize.STRING
      },
      plant_savings_sum: {
        type: Sequelize.REAL
      },
      plant_savings_sum_dollars: {
        type: Sequelize.REAL
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prjt_plant_total');
  }
};