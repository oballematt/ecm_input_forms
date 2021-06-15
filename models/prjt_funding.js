'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prjt_funding extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prjt_funding.init({
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false

    },
    project_id: {
      type: DataTypes.STRING,
    },
    implementation: {
      type: DataTypes.REAL,
    },
    source: {
      type: DataTypes.STRING,
    },
    annual: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Prjt_funding',
    tableName: 'prjt_funding',
    timestamps: false
  });
  return Prjt_funding;
};