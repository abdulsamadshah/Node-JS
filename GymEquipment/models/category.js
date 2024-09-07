const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
module.exports = sequelize.define("Categories", {
  CategoryId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  CategoryName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notNull:{
        msg:"CategoryName cannot be null"
      },
      notEmpty:{
        msg:"CategoryName cannot be empty"
      }
    }
  },
  CategoryImage: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "CategoryImage cannot be null"
      },
      notEmpty: {
        msg: "CategoryImage cannot be empty"
      }
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

  deletedAt: {
    type: Sequelize.DATE,
    allowNull:true,
  }
},
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "Categories"
  }
)