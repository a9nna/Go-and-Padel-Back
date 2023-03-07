import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError";
import { generalError, notFoundError } from "./errorMiddleware";

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;
const req = {} as Request;
const next = jest.fn() as NextFunction;

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call the received next function with the error passed", async () => {
      notFoundError(req, res as Response, next);

      const error = new CustomError("Path not found", 404, "");

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a generalError function", () => {
  describe("When it receives a response object and an error with status 500 and error publicMessage 'Something went wrong'", () => {
    test("Then it should call its status method with 500 and its json method with the error public message 'Something went wrong'", () => {
      const statusCode = 500;
      const publicMessage = "There has been an error";
      const error = new CustomError(
        "There was an error",
        statusCode,
        publicMessage
      );

      generalError(error, req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith({
        error: publicMessage,
      });
    });
  });

  describe("When it receives a response object", () => {
    test("Then it should call its status method with 500 and its jeson method with the error public message 'Something went wrong'", () => {
      const statusCode = 500;
      const publicMessage = "Something went wrong";
      const error = {} as CustomError;

      generalError(error, req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith({ error: publicMessage });
    });
  });
});
