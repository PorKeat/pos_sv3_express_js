const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./productModel");
const Order = require("./orderModel");

const OrderDetail = sequelize.define(
  "OrderDetail",
  {
    orderDetailId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "productId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE", // deletes order details if product is deleted
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE", // deletes order details if order is deleted
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
  },
  {
    tableName: "order_details_porkeat",
    timestamps: true,
  }
);

// Associations
Product.hasMany(OrderDetail, { foreignKey: "productId" });
OrderDetail.belongsTo(Product, { foreignKey: "productId" });

Order.hasMany(OrderDetail, { foreignKey: "orderId" });
OrderDetail.belongsTo(Order, { foreignKey: "orderId" });

module.exports = OrderDetail;
