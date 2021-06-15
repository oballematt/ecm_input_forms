'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prjt_plant_total extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prjt_plant_total.init({
    project_id: DataTypes.STRING,
    phase: DataTypes.STRING,
    plant_commodity: DataTypes.STRING,
    plant_savings_sum: DataTypes.REAL,
    plant_savings_sum_dollars: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Prjt_plant_total',
    tableName: 'prjt_plant_total',
    timestamps: false
  });
  Prjt_plant_total.removeAttribute('id');
  return Prjt_plant_total;
};