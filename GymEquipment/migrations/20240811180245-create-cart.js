
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      CartId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      ProductId:{
        type:Sequelize.INTEGER,
        allowNull:false,
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
      },

      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
 
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull:true,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};