"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const app_1 = __importDefault(require("../src/app"));
const database_1 = require("../src/config/database");
const userFactory = __importStar(require("./factories/authFactory"));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.$executeRaw `TRUNCATE TABLE users RESTART IDENTITY;`;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.$disconnect();
}));
//SIGN UP
describe("Testa POST /signup ", () => {
    const incorrectUser = {
        email: "irmaodojorel.com",
        password: "12345",
        confirmPassword: "abacate",
    };
    it("Should return 201, if registering a user in the correct format", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default)
            .post("/signup")
            .send(userFactory.createUser);
        const status = result.status;
        expect(status).toEqual(201);
    }));
    it("Should return 422,if registering a user in the incorrect format", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).post("/signup").send(incorrectUser);
        const status = result.status;
        expect(status).toEqual(422);
    }));
    it("Should return 409, when trying to register a user that exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/signup").send(userFactory.createUser);
        const result = yield (0, supertest_1.default)(app_1.default)
            .post("/signup")
            .send(userFactory.createUser);
        const status = result.status;
        expect(status).toEqual(409);
    }));
});
//SIGN IN
describe("Testa POST /signin ", () => {
    it("Should return 200, Should return 200, if trying to log in with a user that exists and in the correct format", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/signup").send(userFactory.createUser);
        const result = yield (0, supertest_1.default)(app_1.default)
            .post("/signin")
            .send(userFactory.loginUser);
        const status = result.status;
        expect(status).toEqual(200);
    }));
    it("Should return 401, if the email or password is incorrect or the account does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/signup").send(userFactory.createUser);
        const result = yield (0, supertest_1.default)(app_1.default)
            .post("/signin")
            .send(userFactory.incorrectLoginUser);
        const status = result.status;
        expect(status).toEqual(422);
    }));
    it("Should return 422, if a user logs in in the wrong format", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default)
            .post("/signin")
            .send(userFactory.incorrectJoiPassowrd);
        const status = result.status;
        expect(status).toEqual(422);
    }));
});
