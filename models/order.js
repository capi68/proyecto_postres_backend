'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    
    static associate(models) {
      // an order belongs to a user

      Order.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user"
      });

      // an order have many OrderItems
      Order.hasMany(models.OrderItem, {
        foreignKey: "orderId",
        as: "orderItems"
      });
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(10, 2),
    status: DataTypes.STRING,
    address: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    phone: DataTypes.STRING,
    deliveryMethod: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });

  return Order;
};