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
    type: Sequelize.JSON,
    allowNull: false,
    validate: {
      notNull: {
        msg: "name cannot be null"
      },
      notEmpty: {
        msg: "name cannot be empty"
      }
    },
    // Automatically parse the JSON string to an array/object when retrieving
    get() {
      const rawValue = this.getDataValue('name');
      return JSON.parse(rawValue); // Convert JSON string back to array/object
    },
    // Automatically stringify the array/object before saving to the DB
    set(value) {
      this.setDataValue('name', JSON.stringify(value)); // Convert array/object to JSON string
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
    allowNull: false,
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
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
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