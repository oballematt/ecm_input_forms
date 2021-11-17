'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Model_api_authorization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Model_api_authorization.init({
    email: DataTypes.STRING,
    token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Model_api_authorization',
    tableName: 'model_api_authorization',
    timestamps: false
  });
  Model_api_authorization.removeAttribute('id')
  return Model_api_authorization;
};