import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import Match from "../../../database/models/Match.js";
import { type MatchStructure } from "../../../types.js";

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
    await Match.findByIdAndDelete({ _id: idMatch }).exec();

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

export const createMatch = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    MatchStructure
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const newMatch = req.body;

    await Match.create(newMatch);

    res.status(201).json({ newMatch });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't create the match"
    );

    next(customError);
  }
};

export const getMatchById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idMatch } = req.params;

  try {
    const match = await Match.findById(idMatch).exec();

    res.status(200).json({ match });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't retrieve the match."
    );

    next(customError);
  }
};
