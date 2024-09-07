const { Sequelize } = require("sequelize");

const sequelize = require("../config/database")

module.exports = sequelize.define("Products", {
  ProductId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  ProductName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "ProductName cannot be null"
      },
      notEmpty: {
        msg: "ProductName cannot be empty"
      },
    },
  },

  Weight: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Weight cannot be null"
      },
      notEmpty: {
        msg: "Weight cannot be empty"
      },
    },
  },

  Discount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Discount cannot be null"
      },
      notEmpty: {
        msg: "Discount cannot be empty"
      },
    },
  },

  ProductShortDesc: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "ProductShortDesc cannot be null"
      },
      notEmpty: {
        msg: "ProductShortDesc cannot be empty"
      },
    },
  },

  ProductLongDesc: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "ProductLongDesc cannot be null"
      },
      notEmpty: {
        msg: "ProductLongDesc cannot be empty"
      },
    },
  },

  ProductImage: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "ProductImage cannot be null"
      },
      notEmpty: {
        msg: "ProductImage cannot be empty"
      },
    },
  },

  Price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Price cannot be null"
      },
      notEmpty: {
        msg: "Price cannot be empty"
      },
    },
  },


  StockQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "StockQuantity cannot be null"
      },
      notEmpty: {
        msg: "StockQuantity cannot be empty"
      },
    },

  },

  ProductStatus: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notNull: {
        msg: "ProductStatus cannot be null"
      },
      notEmpty: {
        msg: "ProductStatus cannot be empty"
      },
    },
  },

  CategoryId: {
    type:Sequelize.INTEGER,
    allowNull:false,
    validate: {
      notNull: {
        msg: "CategoryId cannot be null"
      },
      notEmpty: {
        msg: "CategoryId cannot be empty"
      },
    },
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
  modelName: "Products",

})