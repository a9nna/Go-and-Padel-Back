import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import Match from "../../../database/models/Match.js";

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

export const deleteMatchesById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idMatch } = req.params;

  try {
    await Match.findByIdAndDelete({ id: idMatch }).exec();

    res.status(200).json({ idMatch });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't delete the match"
    );

    next(customError);
  }
};
