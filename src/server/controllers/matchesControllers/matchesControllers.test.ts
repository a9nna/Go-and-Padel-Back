import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import Match from "../../../database/models/Match";
import { type MatchStructure } from "../../../types";
import { getMatches } from "./matchesControllers";

describe("Given the getMatch function", () => {
  const matches: MatchStructure = {
    category: "",
    date: new Date("1995-12-17T03:24:00"),
    level: "",
    paddleCourt: 7,
    signedPlayersNumber: 2,
    image: "",
    allowedPlayersNumber: 4,
  };

  describe("When it receives a res object", () => {
    test("Then it should call its status method with 200", async () => {
      const req: Partial<Request> = {};
      const res: Partial<Response> = { status: jest.fn() };
      const next = () => ({});
      const statusCode = 200;

      Match.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(matches),
      }));

      await getMatches(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call its json method with an object with a property matches", async () => {
      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = () => ({});

      Match.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(matches),
      }));

      await getMatches(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ matches });
    });
  });

  describe("When it doesn't receives a res object", () => {
    test("Then it should call the next received function with a CustomError and the message 'Couldn't retrieve matches.'", async () => {
      const customError = new CustomError(
        "Couldn't retrieve matches.",
        500,
        "Couldn't retrieve matches."
      );

      const req: Partial<Request> = {};
      const res: Partial<Response> = {};
      const next: NextFunction = jest.fn();

      Match.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(undefined),
      }));

      await getMatches(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
