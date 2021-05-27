'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('prjt_costs_hours_test', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      project_id: {
        type: DataTypes.STRING,      
        unique: false
      },
      imp_or_ann: {
        type: DataTypes.STRING,
        unique: false
      },
      category: {
        type: DataTypes.STRING,
        unique: false
      },
      cost: {
        type: DataTypes.REAL,
        
      },
      hours: {
        type: DataTypes.REAL
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('prjt_costs_hours_test');
  }
};