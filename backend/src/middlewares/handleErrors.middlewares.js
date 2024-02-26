import { AppError } from "../errors/app.error.js";

class HandleErrorMiddleware {
  static execute = (error, req, res, next) => {
    if (error instanceof AppError) {
      return res.status(error.status).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  };
}

export const handleErrors = HandleErrorMiddleware.execute;
