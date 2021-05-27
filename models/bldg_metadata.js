'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bldg_metadata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bldg_metadata.init({
    acronym: {type: 
      DataTypes.STRING,
      primaryKey: true
    },
  }, {
    sequelize,
    modelName: 'Bldg_metadata',
    tableName: 'bldg_metadata',
    timestamps: false
  });
  return Bldg_metadata;
};