import User from "../models/user.model.js";
import { AppError } from "../errors/app.error.js";
import jsonwebtoken from "jsonwebtoken";

class UserMiddlewares{
    userIdParams = async (req, res, next) => {
        const { id } = req.params;
        const { userTokenId } = res.locals
        let user
        if (id != undefined){
            user = await User.findByPk(id);
        } else {
             user = await User.findByPk(userTokenId);
        }
            
        if(!user) {
            throw new AppError("User not found.", 404 );
        }
        const {password, ...withoutPassword} = user.dataValues
        res.locals.userParams = withoutPassword
        next();
    }

    isTokenValid = async (req, res, next) => {
        const { authorization } = req.headers;
        if(!authorization) {
            throw new AppError("Token not found.", 401);
        }
        
        const token = authorization.split(" ")[1];

        jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                throw new AppError(err.message, 401);
            }
            res.locals.userTokenId = decoded.id
            next();
        });
        
    }

    isUserOwner = async (req, res, next) => {
        const { id } = req.params;
        const { userTokenId } = res.locals
        if(Number(id) !== userTokenId) {
            throw new AppError("User without permission to access this route", 401);
        }
        next();
    }
}

export default UserMiddlewares;
