const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database");


module.exports = sequelize.define("CourseItems", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  CourseId: {
    allowNull: false,
    type: Sequelize.INTEGER,
    validate: {
      notNull: {
        msg: "CourseId Cannot be null",
      },
      notEmpty: {
        msg: "CourseId cannot be empty"
      }
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Product_Name Cannot be null",
      },
      notEmpty: {
        msg: "Product_Name cannot be empty"
      }
    }

  },
  Image: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Image Cannot be null",
      },
      notEmpty: {
        msg: "Image cannot be empty"
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
    allowNull: true,
  },
}, {
  paranoid: true,
  freezeTableName: true,
  tableName: "CourseItems"


})