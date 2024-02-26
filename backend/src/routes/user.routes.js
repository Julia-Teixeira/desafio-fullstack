import express from "express";
import UserController from "../controllers/user.controllers.js";
import UserMiddlewares from "../middlewares/user.middlewares.js";

const userRoutes = express.Router();
const userController = new UserController();
const userMiddlewares = new UserMiddlewares();
userRoutes.post("", userController.create);
userRoutes.post("/login", userController.login);

userRoutes.get("/:id", userMiddlewares.isTokenValid,userMiddlewares.userIdParams, userController.getById)
userRoutes.get("",  userMiddlewares.isTokenValid, userMiddlewares.userIdParams,userController.getById)

userRoutes.use("/:id", userMiddlewares.isTokenValid,userMiddlewares.userIdParams, userMiddlewares.isUserOwner)
userRoutes.patch("/:id", userController.update);
userRoutes.delete("/:id", userController.delete);


export default userRoutes;
