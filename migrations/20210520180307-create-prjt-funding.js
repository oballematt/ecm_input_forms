'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prjt_funding_test', {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
  
      },
      project_id: {
        type: Sequelize.STRING,
      },
      implementation: {
        type: Sequelize.REAL,
      },
      source: {
        type: Sequelize.STRING,
      },
      annual: {
        type: Sequelize.REAL
      },
    
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prjt_funding_test');
  }
};