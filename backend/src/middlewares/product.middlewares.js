import { AppError } from "../errors/app.error.js";
import Product from "../models/product.model.js";

class ProductMiddlewares {
  ensureIdIsValid = async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }
    next();
  };

  isProductOwner = async (req, res, next) => {
    const { id } = req.params;
    const { userTokenId } = res.locals;

    const product = await Product.findByPk(id);

    if (product.userId !== userTokenId) {
      throw new AppError("User without permission to access this route", 401);
    }

    next();
  };
}

export default ProductMiddlewares;
