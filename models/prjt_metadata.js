'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prjt_metadata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prjt_metadata.init({
    project_id:{ type: 
      DataTypes.STRING,
      primaryKey: true
    },
    building: DataTypes.STRING,
    measure_type: DataTypes.STRING,
    status: DataTypes.STRING,
    staff_lead: DataTypes.STRING,
    staff_colead: DataTypes.STRING,
    analyst: DataTypes.STRING,
    project_description: DataTypes.TEXT,
    baseline_start_date: DataTypes.DATE,
    nonenergy_benefits: DataTypes.TEXT,
    reporting_period_start_date: DataTypes.DATE,
    length_baseline_period_days: DataTypes.INTEGER,
    length_reporting_period_days: DataTypes.INTEGER,
    baseline_end_date: DataTypes.DATE,
    reporting_period_end_date: DataTypes.DATE,
    fiscal_year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prjt_metadata',
    tableName: 'prjt_metadata',
    timestamps: false
  });
  return Prjt_metadata;
};