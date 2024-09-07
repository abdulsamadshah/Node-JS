'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('project', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isFeatured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      productImage: {
        type: Sequelize.JSON,  // Use JSON instead of ARRAY
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      shortDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      productUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.JSON,  // Use JSON instead of ARRAY
        allowNull: false,
      },
      tags: {
        type: Sequelize.JSON,  // Use JSON instead of ARRAY
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references: {
          model: "users",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt:{
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('project');
  }
};
