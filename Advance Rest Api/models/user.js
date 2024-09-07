'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');
const AppError = require('../utils/appError');
const project = require('./project');
const user = sequelize.define('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userType: {
    type: Sequelize.ENUM('0', '1', '2'),
    allowNull: false,
    validate: {
      notNull: {
        msg: "userType cannot be null"
      },
      notEmpty: {
        msg: "userType cannot be empty"
      }
    }
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "firstName cannot be null"
      },
      notEmpty: {
        msg: "firstName cannot be empty"
      }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "lastName cannot be null"
      },
      notEmpty: {
        msg: "lastName cannot be empty"
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: "email cannot be null"
      },
      notEmpty: {
        msg: "email cannot be empty"
      },
      isEmail: {
        msg: "Invalid email id"
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "password cannot be null"
      },
      notEmpty: {
        msg: "password cannot be empty"
      }
    }
  },
  confirmPassword: {
    type: Sequelize.VIRTUAL,
    //bcrypt the password
    set(value) {

      if (this.password.length < 7) {
        throw new AppError("Password length must be greater than 7",400)
      }

      if (value === this.password) {
        const hashPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashPassword);


      } else {
        throw new AppError('Password and confirm password must be the same', 400)
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
    type: Sequelize.DATE
  }
}, {
  paranoid: true,
  freezeTableName: true,
  modelName: "users"
}

)

//Association using here means user data pass to anoter api in
user.hasMany(project,{foreignKey: "createdBy"});
project.belongsTo(user,{
  foreignKey:"createdBy"
});
module.exports =user;