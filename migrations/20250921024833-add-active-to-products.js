'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'active');
  }
};
