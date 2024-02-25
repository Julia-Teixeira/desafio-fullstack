import { AppError } from "../errors/app.error.js";
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
      productInfos: newProductInfo[index].map((item) => {
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

  retrieveAll = async () => {
    const produtos = await Product.findAll({
      include: [{ model: ProductInfo, attributes: ["price", "color"] }],
    });

    if (produtos.length === 0) {
      throw new AppError("No registered products", 404);
    }
    return produtos;
  };

  read = async (id) => {
    const product = await Product.findByPk(id, {
      include: [{ model: ProductInfo}],
    });
    return product;
  };

  delete = async (id) => {
    await Product.destroy({
      where: { id },
    })
  }

  update = async (id, payload) => {
    const {productInfos, ...product} = payload

    await Product.update(product,{where: {id}})
    

    if(productInfos){
      await Promise.all(productInfos.map(async (productInfo) => {
        const findInfo = await ProductInfo.findOne({where: {productId: id, color: productInfo.color}})
  
        if(findInfo){
          await ProductInfo.update(productInfo, {where: {id: findInfo.id}})
        } else {
          await ProductInfo.create({...productInfo, productId: id})
        }
      }))
    }

    const updatedProduct = await Product.findByPk(id, {
      include: [{ model: ProductInfo, attributes: ["price", "color"] }],
    });

    return(updatedProduct)
  }

  deleteCor = async (id) => {
    await ProductInfo.destroy({
      where: { id },
    })
  }
}

export default ProductService;
