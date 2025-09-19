'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    image_desktop: {
      type: Sequelize.STRING
    },
    image_tablet: {
      type: Sequelize.STRING
    },
    image_mobile: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
   });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('Products');
  }
};
