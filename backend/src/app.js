import express from "express";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import { handleErrors } from "./middlewares/handleErrors.middlewares.js";
const app = express();

app.use(helmet())
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
  })
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use(handleErrors);

export default app;

