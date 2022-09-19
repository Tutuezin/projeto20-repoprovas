"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const database_1 = require("../src/config/database");
const app_1 = __importDefault(require("../src/app"));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.$executeRaw `TRUNCATE TABLE users RESTART IDENTITY;`;
    yield database_1.prisma.$executeRaw `TRUNCATE TABLE tests`;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.$disconnect();
}));
describe("Testing route POST /create", () => {
    it("Should return status 200 when the user a correct assignment", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            email: "test_email@testemail.com",
            password: "test_email@testemail.com",
            confirmPassword: "test_email@testemail.com",
        };
        yield (0, supertest_1.default)(app_1.default).post("/signup").send(body);
        const newUser = {
            email: "test_email@testemail.com",
            password: "test_email@testemail.com",
        };
        const loggedUser = yield (0, supertest_1.default)(app_1.default).post("/signin").send(newUser);
        const token = loggedUser.text;
        const test = {
            name: "i_am_a_test",
            pdfUrl: "https://www.google.com",
            categoryId: 15,
            teacherDisciplineId: 10,
        };
        const result = yield (0, supertest_1.default)(app_1.default)
            .post(`/test/create`)
            .set({ Authorization: `Bearer ${token}` })
            .send(test);
        expect(result.body).toBeInstanceOf(Object);
    }));
    it("Should return status 422 when name information is null", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            email: "test_email@testemail.com",
            password: "test_email@testemail.com",
            confirmPassword: "test_email@testemail.com",
        };
        yield (0, supertest_1.default)(app_1.default).post("/signup").send(body);
        const newUser = {
            email: "test_email@testemail.com",
            password: "test_email@testemail.com",
        };
        const loggedUser = yield (0, supertest_1.default)(app_1.default).post("/signin").send(newUser);
        const token = loggedUser.text;
        const test = {
            name: "",
            pdfUrl: "https://www.google.com",
            categoryId: 15,
            teacherDisciplineId: 10,
        };
        const result = yield (0, supertest_1.default)(app_1.default)
            .post(`/test/create`)
            .set({ Authorization: `Bearer ${token}` })
            .send(test);
        expect(result.status).toEqual(422);
    }));
    it("Should return status 422 when pdfUrl information is null", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            email: "test_email@testemail.com",
            password: "test_email@testemail.com",
            confirmPassword: "test_email@testemail.com",
        };
        yield (0, supertest_1.default)(app_1.default).post("/signup").send(body);
        const newUser = {
            email: "test_email@testemail.com",
            password: "test_email@testemail.com",
        };
        const loggedUser = yield (0, supertest_1.default)(app_1.default).post("/signin").send(newUser);
        const token = loggedUser.text;
        const test = {
            name: "test_pdf",
            pdfUrl: "",
            categoryId: 15,
            teacherId: 2,
            teacherDisciplineId: 10,
        };
        const result = yield (0, supertest_1.default)(app_1.default)
            .post(`/test/create`)
            .set({ Authorization: `Bearer ${token}` })
            .send(test);
        expect(result.status).toEqual(422);
    }));
    it("Should return status 422 when categoryId information is null or not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            email: "test_email@testemail.com",
            password: "test_email@testemail.com",
            confirmPassword: "test_email@testemail.com",
        };
        yield (0, supertest_1.default)(app_1.default).post("/signup").send(body);
        const newUser = {
            email: "test_email@testemail.com",
            password: "test_email@testemail.com",
        };
        const loggedUser = yield (0, supertest_1.default)(app_1.default).post("/signin").send(newUser);
        const token = loggedUser.text;
        const test = {
            name: "test_name",
            pdfUrl: "https://www.google.com",
            categoryId: null,
            teacherDisciplineId: 10,
        };
        const result = yield (0, supertest_1.default)(app_1.default)
            .post(`/test/create`)
            .set({ Authorization: `Bearer ${token}` })
            .send(test);
        expect(result.status).toEqual(422);
    }));
    it("Should return status 422 when disciplineId information is null or not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            email: "test_email@testemail.com",
            password: "test_email@testemail.com",
            confirmPassword: "test_email@testemail.com",
        };
        yield (0, supertest_1.default)(app_1.default).post("/signup").send(body);
        const newUser = {
            email: "test_email@testemail.com",
            password: "test_email@testemail.com",
        };
        const loggedUser = yield (0, supertest_1.default)(app_1.default).post("/signin").send(newUser);
        const token = loggedUser.text;
        const test = {
            name: "test_pdf",
            pdfUrl: "test_email@testemail.com",
            categoryId: 15,
            disciplineId: null,
            teacherId: 2,
        };
        const result = yield (0, supertest_1.default)(app_1.default)
            .post(`/test/create`)
            .set({ Authorization: `Bearer ${token}` })
            .send(test);
        expect(result.status).toEqual(422);
    }));
});
