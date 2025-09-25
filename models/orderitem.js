'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    
    static associate(models) {
      // One OrderItem belongs to a order
      OrderItem.belongsTo(models.Order, {
        foreignKey: "orderId",
        as: "order"
      });

      // one orderItem belongs to a Product
      OrderItem.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product"
      });
    }
  }
  OrderItem.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};