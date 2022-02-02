'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviewed_models extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reviewed_models.init({
    building: DataTypes.STRING,
    meter: DataTypes.STRING,
    reviewed_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reviewed_models',
    tableName: 'reviewed_models',
    timestamps: false
  });
  return Reviewed_models;
};