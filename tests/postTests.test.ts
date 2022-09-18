import supertest from "supertest";
import { prisma } from "../src/config/database";
import * as userFactory from "./factories/authFactory";
import app from "../src/app";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY;`;
  await prisma.$executeRaw`TRUNCATE TABLE tests`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Testing route POST /create", () => {
  it("Should return status 200 when the user a correct assignment", async () => {
    const body = {
      email: "test_email@testemail.com",
      password: "test_email@testemail.com",
      confirmPassword: "test_email@testemail.com",
    };

    await supertest(app).post("/signup").send(body);

    const newUser = {
      email: "test_email@testemail.com",
      password: "test_email@testemail.com",
    };

    const loggedUser = await supertest(app).post("/signin").send(newUser);
    const token = loggedUser.text;

    const test = {
      name: "i_am_a_test",
      pdfUrl: "https://www.google.com",
      categoryId: 15,
      teacherDisciplineId: 10,
    };

    const result = await supertest(app)
      .post(`/test/create`)
      .set({ Authorization: `Bearer ${token}` })
      .send(test);

    expect(result.body).toBeInstanceOf(Object);
  });

  it("Should return status 422 when name information is null", async () => {
    const body = {
      email: "test_email@testemail.com",
      password: "test_email@testemail.com",
      confirmPassword: "test_email@testemail.com",
    };

    await supertest(app).post("/signup").send(body);

    const newUser = {
      email: "test_email@testemail.com",
      password: "test_email@testemail.com",
    };

    const loggedUser = await supertest(app).post("/signin").send(newUser);
    const token = loggedUser.text;

    const test = {
      name: "",
      pdfUrl: "https://www.google.com",
      categoryId: 15,
      teacherDisciplineId: 10,
    };

    const result = await supertest(app)
      .post(`/test/create`)
      .set({ Authorization: `Bearer ${token}` })
      .send(test);

    expect(result.status).toEqual(422);
  });
  it("Should return status 422 when pdfUrl information is null", async () => {
    const body = {
      email: "test_email@testemail.com",
      password: "test_email@testemail.com",
      confirmPassword: "test_email@testemail.com",
    };

    await supertest(app).post("/signup").send(body);

    const newUser = {
      email: "test_email@testemail.com",
      password: "test_email@testemail.com",
    };

    const loggedUser = await supertest(app).post("/signin").send(newUser);
    const token = loggedUser.text;

    const test = {
      name: "test_pdf",
      pdfUrl: "",
      categoryId: 15,
      teacherDisciplineId: 10,
    };

    const result = await supertest(app)
      .post(`/test/create`)
      .set({ Authorization: `Bearer ${token}` })
      .send(test);

    expect(result.status).toEqual(422);
  });

  it("Should return status 422 when categoryId information is null or not found", async () => {
    const body = {
      email: "test_email@testemail.com",
      password: "test_email@testemail.com",
      confirmPassword: "test_email@testemail.com",
    };

    await supertest(app).post("/signup").send(body);

    const newUser = {
      email: "test_email@testemail.com",
      password: "test_email@testemail.com",
    };

    const loggedUser = await supertest(app).post("/signin").send(newUser);
    const token = loggedUser.text;

    const test = {
      name: "test_name",
      pdfUrl: "https://www.google.com",
      categoryId: null,
      teacherDisciplineId: 10,
    };

    const result = await supertest(app)
      .post(`/create`)
      .set({ Authorization: `Bearer ${token}` })
      .send(test);

    expect(result.status).toEqual(422);
  });

  /* it("Should return status 422 when teacherDiscipline information is null or not found", async () => {
    const body = {
      email: "test_email@testemail.com",
      password: "test_email@testemail.com",
      confirmPassword: "test_email@testemail.com",
    };

    await supertest(app).post("/signup").send(body);

    const newUser = {
      email: "test_email@testemail.com",
      password: "test_email@testemail.com",
    };

    const loggedUser = await supertest(app).post("/signin").send(newUser);
    const token = loggedUser.text;

    const test = {
      name: "test_pdf",
      pdfUrl: "test_email@testemail.com",
      categoryId: 15,
      teacherDisciplineId: null,
    };

    const result = await supertest(app)
      .post(`/create`)
      .set({ Authorization: `Bearer ${token}` })
      .send(test);

    expect(result.status).toEqual(422);
  }); */
});
