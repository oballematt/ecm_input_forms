'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prjt_misc_savings_by_entity', {
      project_id: {
        type: Sequelize.STRING
      },
      phase: {
        type: Sequelize.STRING
      },
      misc_owner: {
        type: Sequelize.STRING
      },
      entity: {
        type: Sequelize.STRING
      },
      misc_savings: {
        type: Sequelize.REAL
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prjt_misc_savings_by_entity');
  }
};