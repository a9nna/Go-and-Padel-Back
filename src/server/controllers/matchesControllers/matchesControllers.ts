import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import Match from "../../../database/models/Match";

export const getMatches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const matches = await Match.find().exec();

    if (!matches) {
      throw new CustomError(
        "Couldn't retrieve matches.",
        500,
        "Couldn't retrieve matches."
      );
    }

    res.status(200).json({ matches });
  } catch (error) {
    next(error);
  }
};
