'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('meter_olsr_models', {
      building_number: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      meter: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      commodity_tag: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      train_start: {
        type: Sequelize.DATEONLY
      },
      train_end: {
        type: Sequelize.DATEONLY
      },
      x: {
        type: Sequelize.STRING
      },
      auto_ignored_percentage: {
        type: Sequelize.REAL
      },
      base_temperature: {
        type: Sequelize.REAL
      },
      r2: {
        type: Sequelize.REAL
      },
      slope: {
        type: Sequelize.REAL
      },
      intercept: {
        type: Sequelize.REAL
      },
      std: {
        type: Sequelize.REAL
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('meter_olsr_models');
  }
};