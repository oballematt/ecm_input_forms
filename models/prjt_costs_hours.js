'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prjt_costs_hours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prjt_costs_hours.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    project_id: {
      type: DataTypes.STRING,
      unique: false
    },
    imp_or_ann: {
      type: DataTypes.STRING,
      unique: false
    },
    category: {
      type: DataTypes.STRING,
      unique: false
    },
    cost: DataTypes.REAL,
    hours: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Prjt_costs_hours',
    tableName: 'prjt_costs_hours_test',
    timestamps: false
  });
  return Prjt_costs_hours;
};