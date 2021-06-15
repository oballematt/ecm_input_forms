'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prjt_plant_each extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prjt_plant_each.init({
    project_id: DataTypes.STRING,
    phase: DataTypes.STRING,
    commodity: DataTypes.STRING,
    plant_commodity: DataTypes.STRING,
    pc_unit: DataTypes.STRING,
    plant_savings: DataTypes.REAL,
    savings_dollars_plant: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Prjt_plant_each',
    tableName: 'prjt_plant_each',
    timestamps: false
  });
  Prjt_plant_each.removeAttribute('id');
  return Prjt_plant_each;
};