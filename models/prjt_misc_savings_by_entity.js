'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prjt_misc_savings_by_entity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prjt_misc_savings_by_entity.init({
    project_id: DataTypes.STRING,
    phase: DataTypes.STRING,
    misc_owner: DataTypes.STRING,
    entity: DataTypes.STRING,
    misc_savings: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Prjt_misc_savings_by_entity',
    tableName: 'prjt_misc_savings_by_entity',
    timestamps: false
  });
  Prjt_misc_savings_by_entity.removeAttribute('id');
  return Prjt_misc_savings_by_entity;
};