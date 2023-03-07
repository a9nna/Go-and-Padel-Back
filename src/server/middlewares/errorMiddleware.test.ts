import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError";
import { notFoundError } from "./errorMiddleware";

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call the received next function", async () => {
      const res = {} as Response;
      const req = {} as Request;
      const next = jest.fn() as NextFunction;
      notFoundError(req, res, next);

      const error = new CustomError("Path not found", 404, "");

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
