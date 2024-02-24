import express from "express";
import ProductController from "../controllers/product.controller.js";
import UserMiddlewares from "../middlewares/user.middlewares.js";
import ProductMiddlewares from "../middlewares/product.middlewares.js";

const productRoutes = express.Router();
const productController = new ProductController();
const productMiddlewares = new ProductMiddlewares();
const userMiddlewares = new UserMiddlewares();

productRoutes.post("", userMiddlewares.isTokenValid, productController.create);
productRoutes.get("", userMiddlewares.isTokenValid, productController.getAll);

productRoutes.use(
  "/:id",
  userMiddlewares.isTokenValid,
  productMiddlewares.ensureIdIsValid
);
productRoutes.get("/:id", productController.getById);
productRoutes.patch("/:id", productMiddlewares.isProductOwner, productController.update);
productRoutes.delete("/:id", productMiddlewares.isProductOwner,productController.delete);

export default productRoutes;
