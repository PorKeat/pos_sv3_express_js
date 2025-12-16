const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./categoryModel");

const Product = sequelize.define(
  "Product",
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE", // safely deletes products if category is deleted
    },
  },
  {
    tableName: "products_porkeat",
    timestamps: true,
  }
);

// Associations
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = Product;
