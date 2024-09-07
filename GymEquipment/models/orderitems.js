const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class OrderItems extends Model {}

OrderItems.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  Orderid: {
    type: DataTypes.STRING,
    references: {
      model: 'Orders',
      key: 'Orderid',
    },
    allowNull: false,
  },
  ProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ProductName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Weight: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ProductShortDesc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ProductImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'OrderItems',
  paranoid: true,
  freezeTableName: true,
});

OrderItems.associate = (models) => {
  OrderItems.belongsTo(models.Orders, { foreignKey: 'Orderid', targetKey: 'Orderid' });
};

module.exports = OrderItems;
