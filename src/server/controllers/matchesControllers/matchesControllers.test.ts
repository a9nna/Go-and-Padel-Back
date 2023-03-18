import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import Match from "../../../database/models/Match";
import { type MatchStructure } from "../../../types";
import {
  createMatch,
  deleteMatchesById,
  getMatches,
} from "./matchesControllers";

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

describe("Given the deleteMatchesById function", () => {
  describe("When it receives a req object with an idMatch in its params property", () => {
    test("Then it should receives a response that call its status method with a 200", async () => {
      const idMatchResult = "djaijdo23aqe3cdw3";
      const expectedStatusCode = 200;

      const req: Partial<Request> = { params: { idMatch: idMatchResult } };
      const res: Partial<Response> = {
        status: jest.fn(),
      };
      const next: NextFunction = () => ({});

      Match.findByIdAndDelete = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(idMatchResult),
      }));

      await deleteMatchesById(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should receives a responce that call its json method with an object with idMatch property", async () => {
      const idMatchResult = "djaijdo23aqe3cdw3";
      const req: Partial<Request> = {
        params: { idMatch: idMatchResult },
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(idMatchResult),
      };
      const next = jest.fn();

      Match.findByIdAndDelete = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(idMatchResult),
      }));

      await deleteMatchesById(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ idMatch: idMatchResult });
    });
  });

  describe("When it receives a req object without an idMatch in its params property", () => {
    test("Then it should receives a next function that is called with a custom error with the error 'Couldn't delete the match'", async () => {
      const idMatchResult = "djaijdo23aqe3cdw3";
      const customError = new CustomError(
        "Couldn't delete the match",
        500,
        "Couldn't delete the match"
      );

      const req: Partial<Request> = { params: { idMatch: idMatchResult } };
      const res: Partial<Response> = {};
      const next: NextFunction = jest.fn();

      Match.findByIdAndDelete = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockRejectedValue(customError),
      }));

      await deleteMatchesById(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given the createMatch function", () => {
  describe("When it receives a response object", () => {
    test("Then it should call its method status with 201", async () => {
      const match: MatchStructure = {
        allowedPlayersNumber: 2,
        category: "",
        date: new Date(),
        image: "",
        level: "",
        paddleCourt: 3,
        signedPlayersNumber: 2,
      };
      const expectedStatus = 201;
      const req: Partial<Request> = {
        body: match,
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
      };
      const next: NextFunction = () => ({});

      Match.create = jest.fn();

      await createMatch(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          MatchStructure
        >,
        res as Response,
        next
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call its method json with an object with newMatch property", async () => {
      const match: MatchStructure = {
        allowedPlayersNumber: 2,
        category: "",
        date: new Date(),
        image: "",
        level: "",
        paddleCourt: 3,
        signedPlayersNumber: 2,
      };
      const req: Partial<Request> = {
        body: match,
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next: NextFunction = () => ({});

      Match.create = jest.fn();

      await createMatch(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          MatchStructure
        >,
        res as Response,
        next
      );

      expect(res.json).toHaveBeenCalledWith({ newMatch: match });
    });
  });

  describe("When it doesn't receives a response object", () => {
    test("Then it should receives a next function that is called with a custom error with the error 'Couldn't create the match'", async () => {
      const match: MatchStructure = {
        allowedPlayersNumber: 2,
        category: "",
        date: new Date(),
        image: "",
        level: "",
        paddleCourt: 3,
        signedPlayersNumber: 2,
      };
      const customError = new CustomError(
        "Couldn't create the match",
        500,
        "Couldn't create the match"
      );

      const req: Partial<Request> = {
        body: match,
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();

      Match.create = jest.fn().mockRejectedValue(customError);

      await createMatch(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          MatchStructure
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
