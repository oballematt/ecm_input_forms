'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prjt_financial_analysis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prjt_financial_analysis.init({
    project_id: DataTypes.STRING,
    phase: DataTypes.STRING,
    entity: DataTypes.STRING,
    cash_flow: DataTypes.STRING,
    imp: DataTypes.STRING,
    npv: DataTypes.DOUBLE,
    payback: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Prjt_financial_analysis',
    tableName: 'prjt_financial_analysis',
    timestamps: false
  });
  Prjt_financial_analysis.removeAttribute('id');
  return Prjt_financial_analysis;
};