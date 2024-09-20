const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database")
module.exports = sequelize.define("Courses", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "category name cannot be null"
      },
      notEmpty: {
        msg: "category name cannot be empty"
      }
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "name cannot be null"
      },
      notEmpty: {
        msg: "name cannot be empty"
      }
    }
  },
  validity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "validaty name cannot be null"
      },
      notEmpty: {
        msg: "validity name cannot be empty"
      }
    }
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notNull: {
        msg: "image name cannot be null"
      },
      notEmpty: {
        msg: "image name cannot be empty"
      }
    }
  },
  price: {
    type: Sequelize.INTEGER,
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
  discount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notNull: {
        msg: "title cannot be null"
      },
      notEmpty: {
        msg: "title cannot be empty"
      }
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
    validate: {
      notNull: {
        msg: "description cannot be null"
      },
      notEmpty: {
        msg: "description cannot be empty"
      }
    }
  },
  demoLectureAvailable: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  createdBy: {
    type: Sequelize.INTEGER,
    references: {
      model: "users",
      key: "UserId"
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
  tableName: "Courses",
  freezeTableName: true,
})