import ProductService from "../services/product.services.js";

class ProductController {
  async create(req, res) {
    const productService = new ProductService();
    const productData = req.body;

    return res.status(201).json(await productService.create(res.locals.userTokenId,productData));
  }
}

export default ProductController;
