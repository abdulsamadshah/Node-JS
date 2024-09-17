const sequelize = require("../config/database");
const { DataTypes, Sequelize } = require('sequelize')

module.exports = sequelize.define("CourseCategories", {
  CourseId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  CourseName: {
    type: Sequelize.STRING,
    validate:{
      notNull:{
        msg:"CourseName cannot be null",
      },
      notEmpty:{
        msg:"CourseName cannot be Empty"
      }
    }
  },
  CourseImage:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      notNull:{
        msg:"CourseImage cannot be null",
      },
      notEmpty:{
        msg:"CourseImage cannot be Empty"
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
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
}, {
  tableName: "CourseCategories",
  freezeTableName: true,
  paranoid: true,
})