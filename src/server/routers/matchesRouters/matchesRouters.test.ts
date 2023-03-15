import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../..";
import connectDatabase from "../../../database/connectDatabase";
import Match from "../../../database/models/Match";
import { type MatchStructure } from "../../../types";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given the GET '/matches' endpoint", () => {
  const existentMatch: MatchStructure = {
    category: "",
    date: new Date("1995-12-17T03:24:00"),
    level: "",
    paddleCourt: 7,
    signedPlayersNumber: 4,
    image: "",
    allowedPlayersNumber: 2,
  };

  describe("When it receives a request object", () => {
    beforeAll(async () => {
      await Match.create(existentMatch);
    });

    test("Then it responds with status 200", async () => {
      await request(app).get("/matches").expect(200);
    });
  });
});
