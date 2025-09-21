'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    
    static associate(models) {
      // A cartItem belongs to a Product

      CartItem.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });

      // a CartItem belongs an one User
      CartItem.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User'
      });
    }
  }
  CartItem.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  },
   {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};