import supertest from "supertest";
import { prisma } from "../src/config/database";
import * as userFactory from "./factories/authFactory";
import app from "../src/app";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

let header: any = null;

describe("Testing route GET /test/discipline", () => {
  it("Should return status 200 when the user get the tests listed by disicpline", async () => {
    await supertest(app).post("/signup").send(userFactory.createUser);

    const user = await supertest(app)
      .post("/signin")
      .send(userFactory.loginUser);

    header = user.text;

    const result = await supertest(app)
      .get("/test/discipline")
      .set("Authorization", header);

    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  it("Should return status 401 when the user try to get the tests but the token isn't informed", async () => {
    await supertest(app).post("/signup").send(userFactory.createUser);

    await supertest(app).post("/signin").send(userFactory.loginUser);
    const token = null;

    const result = await supertest(app)
      .get(`/test/discipline`)
      .set({ Authorization: `Bearer ${token}` });

    expect(result.status).toEqual(401);
  });

  it("Should return status 401 when the user try to get the tests but the token information is wrong", async () => {
    await supertest(app).post("/signup").send(userFactory.createUser);

    await supertest(app).post("/signin").send(userFactory.loginUser);
    const token = "wrong_token";

    const result = await supertest(app)
      .get(`/test/discipline`)
      .set({ Authorization: `Bearer ${token}` });

    expect(result.status).toEqual(401);
  });
});

//TEACHER
describe("Testing route GET /test/teacher", () => {
  it("Should return status 200 when the user get the tests listed by teacher", async () => {
    await supertest(app).post("/signup").send(userFactory.createUser);

    const user = await supertest(app)
      .post("/signin")
      .send(userFactory.loginUser);

    header = user.text;

    const result = await supertest(app)
      .get("/test/teacher")
      .set("Authorization", header);

    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  it("Should return status 401 when the user try to get the tests but the token isn't informed", async () => {
    await supertest(app).post("/signup").send(userFactory.createUser);

    await supertest(app).post("/signin").send(userFactory.loginUser);
    const token = null;

    const result = await supertest(app)
      .get(`/test/teacher`)
      .set({ Authorization: `Bearer ${token}` });

    expect(result.status).toEqual(401);
  });

  it("Should return status 401 when the user try to get the tests but the token information is wrong", async () => {
    await supertest(app).post("/signup").send(userFactory.createUser);

    await supertest(app).post("/signin").send(userFactory.loginUser);
    const token = "wrong_token";

    const result = await supertest(app)
      .get(`/test/teacher`)
      .set({ Authorization: `Bearer ${token}` });

    expect(result.status).toEqual(401);
  });
});
