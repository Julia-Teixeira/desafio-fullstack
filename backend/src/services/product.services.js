import { AppError } from "../errors/app.error.js";
import Product from "../models/product.model.js";
import ProductInfo from "../models/productInfo.model.js";

class ProductService {
  create = async (userId, payload) => {
    const urlImage = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
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
            img: item.img ? item.img : urlImage,
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
              img: payload.img ? payload.img : urlImage,
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
              img: payload.img ? payload.img : urlImage,
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
            img: item.img,
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
      include: [{ model: ProductInfo, attributes: ["id","price", "color", "img"] }],
      order: [["id", "ASC"]],
    });

    if (produtos.length === 0) {
      throw new AppError("No registered products", 404);
    }
    return produtos;
  };

  read = async (id) => {
    const product = await Product.findByPk(id, {
      include: [{ model: ProductInfo, attributes: ["id","price", "color", "img"] }],
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
    const updatedProduct = await Product.findByPk(id, {
      include: [{ model: ProductInfo, attributes: ["id","price", "color", "img"] }],
    });

    return(updatedProduct)
  }
  
  createColor = async (id,payload) => {
    const color = await ProductInfo.create({...payload, productId: id})
    return color
  }

  updateColor = async (id, payload) => {
    await ProductInfo.update(payload, {where: {id}})

    return await ProductInfo.findByPk(id)
  }

  deleteColor = async (id) => {
    await ProductInfo.destroy({
      where: { id },
    })
  }

}

export default ProductService;
