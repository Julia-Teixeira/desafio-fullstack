import express from "express";
import cors from "cors";
import "express-async-errors";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import { handleErrors } from "./middlewares/handleErrors.middlewares.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/products", productRoutes);

export default app;

app.use(handleErrors);
