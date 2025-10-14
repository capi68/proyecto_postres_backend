'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      // a User can have many cartitems
      User.hasMany(models.CartItem, {
        foreignKey: 'userId',
        as: 'cartItems'
      });
      
      User.hasMany(models.Order, {
        foreignKey: "userId",
        as: "orders",
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};