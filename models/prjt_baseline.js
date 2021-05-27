'use strict';
const { INTEGER } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prjt_baseline extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prjt_baseline.init({
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    project_id: {
      type: DataTypes.STRING,
    },
    commodity: {
      type: DataTypes.STRING,
    },
    unit: {
      type: DataTypes.STRING,
    },
    value: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Prjt_baseline',
    tableName: 'prjt_baseline_test',
    timestamps: false
  });
  return Prjt_baseline;
};