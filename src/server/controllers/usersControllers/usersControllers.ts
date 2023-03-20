import "../../../loadEnvironments.js";
import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CustomError } from "../../../CustomError/CustomError.js";
import User from "../../../database/models/User.js";
import { type UserCredentials } from "../../../types";

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();

    if (!user) {
      throw new CustomError("User doesn't exists", 401, "Wrong credentials");
    }

    const comparison = await bcrypt.compare(password, user.password);

    if (!comparison) {
      throw new CustomError("Wrong credentials", 401, "Wrong credentials");
    }

    const jwtPayload = {
      sub: user?._id,
      email: user.email,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

    res.status(200).json({ token, email });
  } catch (error) {
    next(error);
  }
};
