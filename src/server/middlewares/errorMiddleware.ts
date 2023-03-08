import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import { CustomError } from "../../CustomError/CustomError.js";
import { ValidationError } from "express-validation";

export const debug = createDebug("go-and-padel:api:middlewares");

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Path not found", 404, "Endpoint not found");

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    error.publicMessage = error.details
      .body!.map((error) => error.message)
      .join(" & ")!;
  }

  debug(error.message);
  debug(error.publicMessage);

  res
    .status(error.statusCode || 500)
    .json({ error: error.publicMessage || "Something went wrong" });
};
