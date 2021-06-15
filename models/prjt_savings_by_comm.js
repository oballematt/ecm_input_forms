'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prjt_savings_by_comm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prjt_savings_by_comm.init({
    project_id: DataTypes.STRING,
    commodity: DataTypes.STRING,
    phase: DataTypes.STRING,
    entity: DataTypes.STRING,
    fb_plus_fr: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Prjt_savings_by_comm',
    tableName: 'prjt_savings_by_comm',
    timestamps: false
  });
  Prjt_savings_by_comm.removeAttribute('id');
  return Prjt_savings_by_comm;
};