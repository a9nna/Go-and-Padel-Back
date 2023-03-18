import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../..";
import connectDatabase from "../../../database/connectDatabase";
import Match from "../../../database/models/Match";
import { type MatchId, type MatchStructure } from "../../../types";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

const existentMatch: MatchStructure = {
  category: "",
  date: new Date("1995-12-17T03:24:00"),
  level: "",
  paddleCourt: 7,
  signedPlayersNumber: 4,
  image: "",
  allowedPlayersNumber: 2,
};

describe("Given the GET '/matches' endpoint", () => {
  describe("When it receives a request object", () => {
    beforeAll(async () => {
      await Match.create(existentMatch);
    });

    test("Then it responds with status 200", async () => {
      await request(app).get("/matches").expect(200);
    });
  });
});

describe("Given a DELETE '/matches/delete/:idMatch' endpoint", () => {
  let mockMatch: MatchId;

  describe("When it receives a request object with an id in its params property", () => {
    beforeAll(async () => {
      mockMatch = await Match.create(existentMatch);
    });
    test("Then it responds with status 200", async () => {
      const idMatch = mockMatch._id;

      await request(app)
        .delete(`/matches/delete/${idMatch.toString()}`)
        .expect(200);
    });
  });

  describe("When it receives a request object without an id in its params property", () => {
    test("Then it responds with status 500", async () => {
      await request(app).delete(`/matches/delete/idMatch`).expect(500);
    });
  });
});

describe("Given a POST '/matches/create' endpoint", () => {
  describe("When it receives a request object with a new match on its body property", () => {
    test("Then it responds with status 201", async () => {
      const match: MatchStructure = {
        allowedPlayersNumber: 2,
        category: "",
        date: new Date(),
        image: "",
        level: "",
        paddleCourt: 3,
        signedPlayersNumber: 2,
      };

      await request(app).post("/matches/create").send(match).expect(201);
    });
  });
});
