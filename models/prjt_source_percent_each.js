'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prjt_source_percent_each extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prjt_source_percent_each.init({
    project_id: DataTypes.STRING,
    phase: DataTypes.STRING,
    commodity: DataTypes.STRING,
    comm_type: DataTypes.STRING,
    source_energy_baseline: DataTypes.REAL,
    source_energy_savings: DataTypes.REAL,
    savings_percent: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Prjt_source_percent_each',
    tableName: 'prjt_source_percent_each',
    timestamps: false
  });
  Prjt_source_percent_each.removeAttribute('id');
  return Prjt_source_percent_each;
};