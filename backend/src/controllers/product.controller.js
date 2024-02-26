import { response } from "express";
import ProductService from "../services/product.services.js";

class ProductController {
  async create(req, res) {
    const productService = new ProductService();
    const productData = req.body;

    return res
      .status(201)
      .json(await productService.create(res.locals.userTokenId, productData));
  }

  async getAll(req, res) {
    const productService = new ProductService();
    const products = await productService.retrieveAll();

    return res.status(200).json(products);
  }

  async getById(req, res) {
    const productService = new ProductService();
    const product = await productService.read(req.params.id);

    return res.status(200).json(product);
  }

  async update(req, res) {
    const productService = new ProductService();
    const updatedData = await productService.update(
      req.params.id, req.body
    )
    return res.status(200).json(updatedData);
  }

  async delete(req, res) {
   const productService = new ProductService();
   await productService.delete(req.params.id);
   
   return res.sendStatus(204);
  }

  async deleteColor(req, res) {
    const productService = new ProductService();
    await productService.deleteColor(req.params.id);
    return res.sendStatus(204);
  }
}

export default ProductController;
