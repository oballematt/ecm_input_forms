'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prjt_savings_by_comm', {

      project_id: {
        type: Sequelize.STRING
      },
      commodity: {
        type: Sequelize.STRING
      },
      phase: {
        type: Sequelize.STRING
      },
      entity: {
        type: Sequelize.STRING
      },
      fb_plus_fr: {
        type: Sequelize.REAL
      },

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prjt_savings_by_comm');
  }
};