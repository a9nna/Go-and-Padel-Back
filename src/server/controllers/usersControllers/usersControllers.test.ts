import { type Response, type Request, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CustomError } from "../../../CustomError/CustomError";
import User from "../../../database/models/User";
import { type UserCredentials } from "../../../types";
import { loginUser } from "./usersControllers";

describe("Given the loginUser function", () => {
  const userCredentials: UserCredentials = {
    email: "",
    password: "",
  };
  describe("When it receives a request object and the credentials matches with an existent user in database", () => {
    test("Then it should call the response status method with 200 and its json method with an object with a property token and its value", async () => {
      const statusCode = 200;
      const token = "";

      const req = {} as Request<
        Record<string, unknown>,
        Record<string, unknown>,
        UserCredentials
      >;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const next = () => ({});

      req.body = userCredentials;

      User.findOne = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(userCredentials),
      }));
      bcrypt.compare = jest.fn().mockReturnValue(true);

      jwt.sign = jest.fn().mockImplementation(() => token);
      await loginUser(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request object and one of the credentials doesn't match with an existent user in database", () => {
    test("Then it should call the next received function with a CustomError and the message 'Wrong credentials'", async () => {
      const customError = new CustomError("Wrong credentials", 401, "");

      const req = {} as Request<
        Record<string, unknown>,
        Record<string, unknown>,
        UserCredentials
      >;
      const res = {} as Response;
      const next = jest.fn() as NextFunction;

      req.body = userCredentials;

      User.findOne = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(userCredentials),
      }));
      bcrypt.compare = jest.fn().mockReturnValue(false);
      await loginUser(req, res, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it receives a request object and the credentials doesn't match with an existent user in database", () => {
    test("Then it should call the next received function with a CustomError and the message 'User doesn't exists'", async () => {
      const customError = new CustomError("User doesn't exists", 401, "");

      const req = {} as Request<
        Record<string, unknown>,
        Record<string, unknown>,
        UserCredentials
      >;
      const res = {} as Response;
      const next = jest.fn() as NextFunction;

      req.body = userCredentials;

      User.findOne = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(undefined),
      }));
      await loginUser(req, res, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
