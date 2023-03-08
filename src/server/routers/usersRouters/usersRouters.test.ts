import "../../../loadEnvironments.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../index";
import connectDatabase from "../../../database/connectDatabase";
import User from "../../../database/models/User";
import { type UserStructure, type UserCredentials } from "../../../types";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given the POST '/users/login' endpoint", () => {
  const existentUser: UserStructure = {
    password: "$2a$12$lvw2.nYc5Mlt56SEBEFCy.VG6WmUsTdL4axRi/KCLGnstCUsmFEFW",
    name: "Manoli",
    email: "manoli@manoli.com",
    image: "",
  };

  const userCredentials: UserCredentials = {
    password: "holaholahola",
    email: "manoli@manoli.com",
  };

  describe("When it receives a request with username 'Manoli' and password '12345678' and user exists", () => {
    beforeAll(async () => {
      await User.create(existentUser);
    });

    test("Then it responds with status 200 and the body of the response has the 'token' property", async () => {
      const response = await request(app)
        .post("/users/login")
        .send(userCredentials)
        .expect(200);

      expect(response.body).toHaveProperty("token");
    });
  });
});
