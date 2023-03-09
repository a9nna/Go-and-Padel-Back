import { type NextFunction, type Request, type Response } from "express";
import { ValidationError, type errors } from "express-validation";
import { CustomError } from "../../CustomError/CustomError";
import { generalError, notFoundError } from "./errors";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const req: Partial<Request> = {};
const next: NextFunction = jest.fn();

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call the received next function with the error passed", async () => {
      notFoundError(req as Request, res as Response, next);

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

      generalError(error, req as Request, res as Response, next);

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
      const error: Partial<CustomError> = {};

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith({ error: publicMessage });
    });
  });

  describe("When it receives an error object generated due to missing password in credentials", () => {
    test("Then the erro public message will be '\"password\" is required'", () => {
      const error: errors = {
        body: [
          {
            name: "ValidationError",
            isJoi: true,
            annotate(stripColors) {
              return "";
            },
            _original: "",
            message: "'password' is required",
            details: [
              {
                message: "",
                path: [""],
                type: "",
              },
            ],
          },
        ],
      };

      const publicMessage = "'password' is required";
      const newError = new ValidationError(error, {});

      generalError(
        newError as unknown as CustomError,
        req as Request,
        res as Response,
        next
      );

      expect(res.json).toHaveBeenCalledWith({ error: publicMessage });
    });
  });
});
