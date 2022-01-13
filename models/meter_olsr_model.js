'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meter_olsr_model extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Meter_olsr_model.init({
    building_number: {
     type: DataTypes.STRING,
     primaryKey: true,
     allowNull: false
    },
    meter: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
     },
    commodity_tag: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
     },
    train_start: DataTypes.DATEONLY,
    train_end: DataTypes.DATEONLY,
    x: DataTypes.STRING,
    auto_ignored_percentage: DataTypes.REAL,
    base_temperature: DataTypes.REAL,
    r2: DataTypes.REAL,
    slope: DataTypes.REAL,
    intercept: DataTypes.REAL,
    std: DataTypes.REAL,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Meter_olsr_model',
    tableName: 'meter_olsr_model',
    timestamps: false
  });
  Meter_olsr_model.removeAttribute('id');
  return Meter_olsr_model;
};