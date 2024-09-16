const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");

module.exports = sequelize.define(
  "users",
  {
    UserId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    ProfileImage: {
      type: DataTypes.STRING,
      allowNull: true, // Optional, as it can have a default value
      defaultValue: "default-profile.png", // You can use a default image
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "FirstName is required",
        },
        notEmpty: {
          msg: "FirstName cannot be empty",
        },
      },
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "LastName is required",
        },
        notEmpty: {
          msg: "LastName cannot be empty",
        },
      },
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please provide a valid email address",
        },
        notNull: {
          msg: "Email is required",
        },
        notEmpty: {
          msg: "Email cannot be empty",
        },
      },
    },
    MobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9]{10,15}$/, // Regex for mobile numbers
          msg: "Mobile number must be valid",
        },
        notNull: {
          msg: "Mobile number is required",
        },
        notEmpty: {
          msg: "Mobile number cannot be empty",
        },
      },
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password cannot be empty",
        },
      },
      set(value) {
        if (value.length < 7) {
          throw new AppError("Password length must be greater than 7 characters", 400);
        }

        if (value) {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue("Password", hashPassword);
        }
      },
    },


    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {

    paranoid: true,
    freezeTableName: true,
    tableName: "users"


  }
);
