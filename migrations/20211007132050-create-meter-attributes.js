'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('meter_attributes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      meter_name: {
        type: Sequelize.STRING
      },
      building_name: {
        type: Sequelize.STRING
      },
      model_start: {
        type: Sequelize.DATEONLY
      },
      model_end: {
        type: Sequelize.DATEONLY
      },
      analysis_start: {
        type: Sequelize.DATEONLY
      },
      analysis_end: {
        type: Sequelize.DATEONLY
      },
      meter_description: {
        type: Sequelize.STRING
      },
      base_temp: {
        type: Sequelize.INTEGER
      },
      auto_ignored: {
        type: Sequelize.INTEGER
      },
      slope: {
        type: Sequelize.REAL
      },
      intercept: {
        type: Sequelize.REAL
      },
      r_squared: {
        type: Sequelize.REAL
      },
      std_dev: {
        type: Sequelize.REAL
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
    await queryInterface.dropTable('meter_attributes');
  }
};