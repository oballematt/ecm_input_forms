'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meter_attributes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Meter_attributes.init({
    meter_name: DataTypes.STRING,
    building_name: DataTypes.STRING,
    model_start: DataTypes.DATEONLY,
    model_end: DataTypes.DATEONLY,
    analysis_start: DataTypes.DATEONLY,
    analysis_end: DataTypes.DATEONLY,
    meter_description: DataTypes.STRING,
    base_temp: DataTypes.INTEGER,
    auto_ignored: DataTypes.INTEGER,
    slope: DataTypes.REAL,
    intercept: DataTypes.REAL,
    r_squared: DataTypes.REAL,
    std_dev: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Meter_attributes',
    tableName: 'meter_attributes'
  });
  return Meter_attributes;
};