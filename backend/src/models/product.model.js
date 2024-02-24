import { DataTypes } from "sequelize";
import database from "../database/database.js";
import User from "./user.model.js";
import ProductInfo from "./productInfo.model.js";

const Product = database.define("products", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
  },
  brand: {
    type: DataTypes.STRING(100),
  },
  model: {
    type: DataTypes.STRING(100),
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

Product.User = Product.belongsTo(User, {
  onDelete: "cascade",
});
Product.ProductInfos = Product.hasMany(ProductInfo,{
  onDelete: "cascade",
});

export default Product;