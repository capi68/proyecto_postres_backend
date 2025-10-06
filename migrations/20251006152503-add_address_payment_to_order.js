'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'adress', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Orders', 'paymentMethod', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'address');
    await queryInterface.removeColumn('Orders', 'paymentMethod');
  }
};
