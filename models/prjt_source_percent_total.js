'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prjt_source_percent_total extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prjt_source_percent_total.init({
    project_id: DataTypes.STRING,
    phase: DataTypes.STRING,
    comm_type: DataTypes.STRING,
    source_baseline_total: DataTypes.REAL,
    source_savings_total: DataTypes.REAL,
    percent_total: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Prjt_source_percent_total',
    tableName: 'prjt_source_percent_total',
    timestamps: false
  });
  Prjt_source_percent_total.removeAttribute('id');
  return Prjt_source_percent_total;
};