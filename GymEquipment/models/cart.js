const sequelize = require("../config/database");

const { Model, Sequelize, DataTypes } = require('sequelize');
module.exports = sequelize.define("Carts", {
  CartId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  ProductId:{
    type:Sequelize.INTEGER,
    allowNull:false,
    validate: {
      notNull: {
        msg: "ProductId cannot be null",
      },
      notEmpty: {
        msg: "ProductId cannot be empty"
      },
    }
  },

  ProductName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  Weight: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  Discount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  ProductShortDesc: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  ProductLongDesc: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  ProductImage: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  Price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },


  StockQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  ProductStatus: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  CategoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  Qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Qty cannot be null",
      },
      notEmpty: {
        msg: "Qty cannot be empty"
      },
    }
  },

  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },


  createdBy: {
    type: Sequelize.INTEGER,
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

  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  }
}, {
  paranoid: true,
  freezeTableName: true,
  tableName: "Carts"
})
