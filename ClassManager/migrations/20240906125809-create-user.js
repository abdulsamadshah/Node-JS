'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        UserType: {
          type: Sequelize.ENUM('Seller', 'Buyer'),
        },
        ProfileImage: {
          type: Sequelize.STRING,
        },
        FirstName: {
          type: Sequelize.STRING
        },
        LastName: {
          type: Sequelize.STRING,
        },

        Email: {
          type: Sequelize.STRING
        },
        MobileNo: {
          type: Sequelize.INTEGER
        },
        Password: {
          type: Sequelize.STRING
        },

        ClassesName: {
          type: Sequelize.STRING
        },
        PanNo: {
          type: Sequelize.STRING
        },
        PanImage: {
          type: Sequelize.STRING
        },
        GstNumber: {
          type: Sequelize.STRING
        },
        GstImage: {
          type: Sequelize.STRING
        },
        ClassesImages: {
          type: Sequelize.STRING
        },
       WhatsAppNumber: {
          type: Sequelize.INTEGER
        },
        Address: {
          type: Sequelize.INTEGER
        },
        Address2: {
          type: Sequelize.INTEGER
        },
        CityName: {
          type: Sequelize.STRING
        },
        StateName: {
          type: Sequelize.STRING
        },
        PinCode: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};