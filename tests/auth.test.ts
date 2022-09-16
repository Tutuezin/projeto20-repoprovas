import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/config/database";
import * as userFactory from "./factories/authFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

//SIGN UP
describe("Testa POST /signup ", () => {
  const incorrectUser = {
    email: "irmaodojorel.com",
    password: "12345",
    confirmPassword: "abacate",
  };

  it("Should return 201, if registering a user in the correct format", async () => {
    const result = await supertest(app)
      .post("/signup")
      .send(userFactory.createUser);
    const status = result.status;

    expect(status).toEqual(201);
  });

  it("Should return 422,if registering a user in the incorrect format", async () => {
    const result = await supertest(app).post("/signup").send(incorrectUser);
    const status = result.status;

    expect(status).toEqual(422);
  });

  it("Should return 409, when trying to register a user that exists", async () => {
    await supertest(app).post("/signup").send(userFactory.createUser);
    const result = await supertest(app)
      .post("/signup")
      .send(userFactory.createUser);
    const status = result.status;

    expect(status).toEqual(409);
  });
});

//SIGN IN
describe("Testa POST /signin ", () => {
  it("Should return 200, Should return 200, if trying to log in with a user that exists and in the correct format", async () => {
    await supertest(app).post("/signup").send(userFactory.createUser);
    const result = await supertest(app)
      .post("/signin")
      .send(userFactory.loginUser);

    const status = result.status;

    expect(status).toEqual(200);
  });

  it("Should return 401, if the email or password is incorrect or the account does not exist", async () => {
    await supertest(app).post("/signup").send(userFactory.createUser);
    const result = await supertest(app)
      .post("/signin")
      .send(userFactory.incorrectLoginUser);

    const status = result.status;

    expect(status).toEqual(422);
  });

  it("Should return 422, if a user logs in in the wrong format", async () => {
    const result = await supertest(app)
      .post("/signin")
      .send(userFactory.incorrectJoiPassowrd);

    const status = result.status;

    expect(status).toEqual(422);
  });
});
