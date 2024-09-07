const { valid } = require("joi");
const {sequelize} = require("../config/database");
const {Sequelize} = require("sequelize");

  

module.exports = (sequelize.define("users"), {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  UserType: {
    type: Sequelize.ENUM('Seller', 'Buyer'),
    validator:{
      allowNull:false,
      notNull:{
        msg:"UserType Cannot be null",
      },
      notEmpty:{
        msg:"UserType cannot be empty"
      }
    }
  },
  ProfileImage: {
  
    type: Sequelize.STRING,
    allowNull:false,
    validator:{
      notNull:{
        msg:"Profile Image cannot be null"
      },
      notEmpty:{
        msg:"Profile Image cannot be empty"
      }
    }
  },
  FirstName: {
    type: Sequelize.STRING,
    allowNull:false,
    validator:{
      notNull:{
        msg:"First Name cannot be null"
      },
      notEmpty:{
        msg:"First Name cannot be empty"
      }
    }
  },
  LastName: {
    type: Sequelize.STRING,
    allowNull:false,
    validator:{
      notNull:{
        msg:"Last Name cannot be null"
      },
      notEmpty:{
        msg:"Last Name cannot be empty"
      }
    }
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
}
);