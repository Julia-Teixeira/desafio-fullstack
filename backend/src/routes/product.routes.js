import express from "express";
import ProductController from "../controllers/product.controller.js";
import UserMiddlewares from "../middlewares/user.middlewares.js";

const productRoutes = express.Router();
const productController = new ProductController();
const userMiddlewares = new UserMiddlewares();

productRoutes.post("", userMiddlewares.isTokenValid, productController.create);
productRoutes.get("", productController.getAll);


// userRoutes.use("/:id", userMiddlewares.isTokenValid,userMiddlewares.userIdParams, userMiddlewares.isUserOwner)
// userRoutes.get("/:id", userController.getById)
// userRoutes.patch("/:id", userController.update);
// userRoutes.delete("/:id", userController.delete);


export default productRoutes;