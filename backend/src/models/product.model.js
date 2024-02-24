import { DataTypes } from "sequelize";
import database from "../database/database.js";

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
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: "users",
      key: "id",
      onDelete: "CASCADE"
    }
  }
});

export default Product;