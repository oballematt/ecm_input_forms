'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prjt_misc_savings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prjt_misc_savings.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    project_id: DataTypes.STRING,
    phase: DataTypes.STRING,
    misc_owner: DataTypes.STRING,
    misc_savings: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Prjt_misc_savings',
    tableName: 'prjt_misc_savings',
    timestamps: false
  });
  return Prjt_misc_savings;
};