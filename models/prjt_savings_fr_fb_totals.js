'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prjt_savings_fr_fb_totals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prjt_savings_fr_fb_totals.init({
    project_id: DataTypes.STRING,
    phase: DataTypes.STRING,
    entity: DataTypes.STRING,
    fb_total: DataTypes.REAL,
    fr_total: DataTypes.REAL,
    fb_fr_total: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Prjt_savings_fr_fb_totals',
    tableName: 'prjt_savings_fr_fb_totals',
    timestamps: false
  });
  Prjt_savings_fr_fb_totals.removeAttribute('id');
  return Prjt_savings_fr_fb_totals;
};