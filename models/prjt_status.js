'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prjt_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prjt_status.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Prjt_status',
    tableName: 'project_status',
    timestamps: false
  });
  Prjt_status.removeAttribute('id');
  return Prjt_status;
};