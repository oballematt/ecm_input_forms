'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prjt_savings_fr_fb_totals', {
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
      fb_total: {
        type: Sequelize.REAL
      },
      fr_total: {
        type: Sequelize.REAL
      },
      fb_fr_total: {
        type: Sequelize.REAL
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prjt_savings_fr_fb_totals');
  }
};