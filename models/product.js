'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
      // a product can be in many cartitems

      Product.hasMany(models.CartItem, {
        foreignKey: 'productId',
        as: 'cartItems'
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    image_desktop: DataTypes.STRING,
    image_tablet: DataTypes.STRING,
    image_mobile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};