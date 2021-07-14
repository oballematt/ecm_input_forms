'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Measure_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Measure_types.init({
    measure_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Measure_types',
    tableName: "measure_types",
    timestamps: false
  });
  Measure_types.removeAttribute('id')
  return Measure_types;
};