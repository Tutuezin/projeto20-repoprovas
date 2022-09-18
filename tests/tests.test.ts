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

describe("Testing route GET /test/discipline", () => {
  it("Should return status 200 when the user get the tests listed by disicpline", async () => {
    await supertest(app).post("/signup").send(userFactory.createUser);

    const user = await supertest(app)
      .post("/signin")
      .send(userFactory.loginUser);

    const token = user.text;

    const result = await supertest(app)
      .get(`/test/discipline`)
      .set({ Authorization: `Bearer ${token}` })
      .send();

    expect(result.body).toBeInstanceOf(Object);
  });
});
