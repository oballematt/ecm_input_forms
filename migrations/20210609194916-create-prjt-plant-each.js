'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prjt_plant_each', {
      project_id: {
        type: Sequelize.STRING
      },
      phase: {
        type: Sequelize.STRING
      },
      commodity: {
        type: Sequelize.STRING
      },
      plant_commodity: {
        type: Sequelize.STRING
      },
      pc_unit: {
        type: Sequelize.STRING
      },
      plant_savings: {
        type: Sequelize.REAL
      },
      savings_dollars_plant: {
        type: Sequelize.REAL
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prjt_plant_each');
  }
};