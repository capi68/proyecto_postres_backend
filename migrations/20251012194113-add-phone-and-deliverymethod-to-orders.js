'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Orders', 'deliveryMethod', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'phone');
    await queryInterface.removeColumn('Orders', 'deliveryMethod');
  }
};
