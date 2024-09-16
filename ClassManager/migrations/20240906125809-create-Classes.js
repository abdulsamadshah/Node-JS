'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Classes', {
      ClassId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
    
      ProfileImage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      FirstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      LastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      MobileNo: {
        type: Sequelize.STRING, // Changed to STRING to handle numbers with leading zeros
        allowNull: false
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // Fields specific to "Seller" that can be null for "Buyer"
      ClassesName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      PanNo: {
        unique:true,
        type: Sequelize.STRING,
        allowNull: true
      },
      PanImage: {
        unique:true,
        type: Sequelize.STRING,
        allowNull: true
      },
      GstNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      GstImage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ClassesImages: {
        type: Sequelize.STRING,
        allowNull: true
      },
      WhatsAppNumber: {
        type: Sequelize.STRING, // Changed to STRING to handle numbers with leading zeros
        allowNull: true
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Address2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      CityName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      StateName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      PinCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Classes');
  }
};
