import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import authRouter from "../routes/auth";
import { User } from "../models/User";
import dotenv from "dotenv";

dotenv.config();
let mongoServer;
let app;

beforeAll(async () => {
  // Start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  // Setup express app
  app = express();
  app.use(express.json());
  app.use("/auth", authRouter);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clean up users between tests
  await User.deleteMany({});
});

describe("Auth routes", () => {
  test("Signup: should create a new user", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({ username: "testuser", password: "1234" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.username).toBe("testuser");

    const userInDb = await User.findOne({ username: "testuser" });
    expect(userInDb).not.toBeNull();
  });

  test("Signup: should not allow duplicate users", async () => {
    await User.create({ username: "testuser", password: "1234" });

    const res = await request(app)
      .post("/auth/signup")
      .send({ username: "testuser", password: "1234" });

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe("User already exists");
  });

  test("Login: should login an existing user", async () => {
    // Create user manually with hashed password
    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.hash("1234", 10);
    await User.create({ username: "testuser", password: hashedPassword });

    const res = await request(app)
      .post("/auth/login")
      .send({ username: "testuser", password: "1234" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.username).toBe("testuser");
  });

  test("Login: should fail with wrong credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "fakeuser", password: "wrong" });

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe("Invalid credentials");
  });
});
