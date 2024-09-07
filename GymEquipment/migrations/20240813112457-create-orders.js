module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      Orderid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: () => {
          const date = new Date().toISOString().replace(/[-T:.Z]/g, '');
          return `GYM-Order-${date}`;
        }
      },

      item: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      OrderStatus: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      OrderDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pincode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  
      grandTotal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      PaymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Orderid: {
        type: Sequelize.STRING,
        references: {
          model: 'Orders',
          key: 'Orderid',
        },
        allowNull: false,
      },
      ProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ProductName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Weight: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ProductShortDesc: {
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
      Qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderItems');
    await queryInterface.dropTable('Orders');
  }
};
