const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('project', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "title cannot be null"
      },
      notEmpty: {
        msg: "title cannot be empty"
      }
    }
  },
  isFeatured: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    validate: {
      isIn: {
        args: [[true, false]],
        msg: "isFeatured value must be true or false"
      }
    }
  },
  productImage: {
    type: Sequelize.JSON, // Use JSON instead of ARRAY
    allowNull: false,
    validate: {
      notNull: {
        msg: "productImage cannot be null"
      }
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notNull: {
        msg: "price cannot be null"
      },
      notEmpty: {
        msg: "price cannot be empty"
      }
    }
  },
  shortDescription: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "shortDescription cannot be null"
      },
      notEmpty: {
        msg: "shortDescription cannot be empty"
      }
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true, // Allow null
    validate: {
      notEmpty: {
        msg: "description cannot be empty"
      }
    }
  },
  productUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "productUrl cannot be null"
      },
      notEmpty: {
        msg: "productUrl cannot be empty"
      },
      isUrl: {
        msg: "Invalid productUrl"
      }
    }
  },
  category: {
    type: Sequelize.JSON, // Use JSON instead of ARRAY
    allowNull: false,
    validate: {
      notNull: {
        msg: "category cannot be null"
      }
    }
  },
  tags: {
    type: Sequelize.JSON, // Use JSON instead of ARRAY
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
    type: Sequelize.DATE
  }
}, {
  paranoid: true,
  freezeTableName: true,
  modelName: "project"
});
