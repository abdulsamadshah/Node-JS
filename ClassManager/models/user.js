// models/user.js
const { Sequelize, DataTypes } = require("sequelize");
const  sequelize  = require("../config/database"); 
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");

// Define the User Model
module.exports  = sequelize.define("users", {
  UserType: {
    type: Sequelize.ENUM('Classes', 'Users'),
    allowNull: false,
    validate:{
      notNull:{
        msg:"UserType cannot be null"
      },
      notEmpty:{
        msg:"UserType cannot be empty"
      }
    }
  },
  ProfileImage: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notNull:{
        msg:"ProfileImage cannot be null"
      },
      notEmpty:{
        msg:"ProfileImage cannot be empty"
      }
    }
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notNull:{
        msg:"FirstName cannot be null"
      },
      notEmpty:{
        msg:"FirstName cannot be empty"
      }
    }
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notNull:{
        msg:"LastName cannot be null"
      },
      notEmpty:{
        msg:"LastName cannot be empty"
      }
    }
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: "Email is not valid" },
      notNull:{
        msg:"LastName cannot be null"
      },
      notEmpty:{
        msg:"LastName cannot be empty"
      }
    }
  },
  MobileNo: {
    type: DataTypes.STRING,
    allowNull: false,
   
    validate:{
      
      notNull:{
        msg:"MobileNo cannot be null"
      },
      notEmpty:{
        msg:"MobileNo cannot be empty"
      }
    },
   
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notNull:{
        msg:"Password cannot be null"
      },
      notEmpty:{
        msg:"Password cannot be empty"
      }
    },
    set(value) {

      if (value.length < 7) {
        throw new AppError("Password length must be greater than 7", 400)
      }

      if (value !=null && value !="") {
        const hashPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('Password', hashPassword);
      } 
    }
  },
  ClassesName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  PanNo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  PanImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  GstNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  GstImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ClassesImages: {
    type: DataTypes.STRING,
    allowNull: true
  },
  WhatsAppNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Address2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  CityName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  StateName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  PinCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  deletedAt: {
    type: DataTypes.DATE
  }
});


