import { AppError } from "../errors/app.error.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import bycrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import ProductInfo from "../models/productInfo.model.js";

class UserService {
  create = async (userData) => {
    const { email } = userData;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      throw new AppError("User already exists");
    }
    const user = await User.create(userData);
    return user;
  };

  getUser = async ( id ) => {
    return await User.findByPk(id);
  }

  getById = async ( userParams, ) => {
    // const productUser = await Product.findAll({
    //   where: {
    //     userId: userParams.id
    //   },
    //   attributes: ["id", "name", "brand", "model", "createdAt", "updatedAt"],
    //   include: [
    //     {
    //       model: ProductInfo,
    //       attributes: ["id","color", "price", "img"],
    //     }
    //   ]
    // })

    return userParams;
  };

  partialUpdate = async (id, userData) => {
    if(userData.password) {
      const hashedPassword = await bycrypt.hash(userData.password, 10);
      userData.password = hashedPassword
    }

    await User.update(userData, {
      where: { id },
    });
   
    const userDataUpdated = await User.findByPk(id);
    const { password, ...withoutPassword } = userDataUpdated.dataValues

    return withoutPassword;
  };

  delete = async (id) => {
    await User.destroy({ where: { id } });
  };

  login = async (userData) => {
    const { email, password } = userData;

    const user = await User.findOne({ where: { email } });
    if(!user) {
      throw new AppError("User not found", 404);
    }
    
    const samePassword = await bycrypt.compare(password, user.password);
    if (!samePassword) {
      throw new AppError("Incorrect email or password", 401);
    }

    const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })

    return {token}
  }
}

export default UserService;
