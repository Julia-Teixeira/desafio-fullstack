import { AppError } from "../errors/app.error.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import ProductInfo from "../models/productInfo.model.js";

class ProductService {
  create = async (userId, payload) => {
    let productData;
    if (Array.isArray(payload)) {
      const products = payload.map((product) => {
        return {
          name: product.name,
          brand: product.brand,
          model: product.model,
          data: product.data.map((item) => ({
            price: item.price,
            color: item.color,
          })),
        };
      });

      productData = products;
    } else if (payload.details) {
      const product = [
        {
          name: payload.name,
          brand: payload.details.brand,
          model: payload.details.model,
          data: [
            {
              price: payload.price,
              color: payload.details.color,
            },
          ],
        },
      ];

      productData = product;
    } else {
      const product = [
        {
          name: payload.name,
          brand: payload.brand,
          model: payload.model,
          data: [
            {
              price: payload.price,
              color: payload.color,
            },
          ],
        },
      ];
      productData = product;
    }

    const newProduct = await Product.bulkCreate(
      productData.map((product) => ({
        name: product.name,
        brand: product.brand,
        model: product.model,
        userId,
      }))
    );

    const newProductInfo = await Promise.all(
      newProduct.map(async (product, index) => {
        const productInfo = await ProductInfo.bulkCreate(
          productData[index].data.map((item) => ({
            price: item.price,
            color: item.color,
            productId: product.id,
          }))
        ).then((productInfo) => productInfo);

        return productInfo;
      })
    );

    const product = newProduct.map((product, index) => ({
      ...product.dataValues,
      details: newProductInfo[index].map((item) => {
        return {
          id: item.dataValues.id,
          price: item.dataValues.price,
          color: item.dataValues.color,
          createdAt: item.dataValues.createdAt,
          updatedAt: item.dataValues.updatedAt,
        };
      }),
    }));
    return product;
  };
}

export default ProductService;
