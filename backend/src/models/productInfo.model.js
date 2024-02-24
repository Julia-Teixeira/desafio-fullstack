import { DataTypes } from "sequelize";
import database from "../database/database.js";

const ProductInfo = database.define("productInfos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DOUBLE,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "products",
      key: "id",
      onDelete: "CASCADE",
    },
  },
});

export default ProductInfo;
