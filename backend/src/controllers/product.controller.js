import ProductService from "../services/product.services.js";

class ProductController {
  async create(req, res) {
    const productService = new ProductService();
    const productData = req.body;

    return res.status(201).json(await productService.create(res.locals.userTokenId,productData));
  }

  async getAll(req, res) {
    const productService = new ProductService();
    const products = await productService.retrieveAll();

    return res.status(200).json(products);
  }
}

export default ProductController;
