import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CustomError } from "../../../CustomError/CustomError";
import User from "../../../database/models/User";
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
  const { email, password } = req.body;

  const user = await User.findOne({ email, password }).exec();

  if (!user) {
    const customError = new CustomError(
      "User doesn't exists",
      401,
      "Wrong credentials"
    );

    next(customError);

    return;
  }

  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison) {
    const customError = new CustomError(
      "Wrong credentials",
      401,
      "Wrong credentials"
    );

    next(customError);

    return;
  }

  const jwtPayload = {
    sub: user?._id,
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

  res.status(200).json({ token });
};