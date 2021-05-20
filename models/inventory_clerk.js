'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory_Clerk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Inventory_Clerk.init({
    clerk_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inventory_Clerk',
  });
  return Inventory_Clerk;
};