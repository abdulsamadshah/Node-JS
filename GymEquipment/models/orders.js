const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Orders = sequelize.define('Orders', {
  Orderid: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    defaultValue: () => {
      const date = new Date().toISOString().replace(/[-T:.Z]/g, '');
      return `GYM-Order-${date}`;
    },
  },

  item: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "item cannot be null" },
      isInt: { msg: "item must be an integer" },
      min: { args: [1], msg: "item must be at least 1" },
    },
  },
  OrderStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "OrderStatus cannot be null" },
      notEmpty: { msg: "OrderStatus cannot be empty" },
    },
  },
  OrderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Street cannot be null" },
      notEmpty: { msg: "Street cannot be empty" },
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Address cannot be null" },
      notEmpty: { msg: "Address cannot be empty" },
    },
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "City cannot be null" },
      notEmpty: { msg: "City cannot be empty" },
    },
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "State cannot be null" },
      notEmpty: { msg: "State cannot be empty" },
    },
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Pincode cannot be null" },
      notEmpty: { msg: "Pincode cannot be empty" },
    },
  },

  grandTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "GrandTotal cannot be null" },
      isInt: { msg: "GrandTotal must be an integer" },
      min: { args: [0], msg: "GrandTotal must be at least 0" },
    },
  },
  PaymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "PaymentMethod cannot be null" },
      notEmpty: { msg: "PaymentMethod cannot be empty" },
    },
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Orders',
  paranoid: true,
  freezeTableName: true,
});

Orders.associate = (models) => {
  Orders.hasMany(models.OrderItems, { foreignKey: 'Orderid', sourceKey: 'Orderid' });
};

module.exports = Orders;
