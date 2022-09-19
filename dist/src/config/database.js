"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.connection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = __importDefault(require("pg"));
dotenv_1.default.config();
// Postgres Client
const { Pool } = pg_1.default;
exports.connection = new Pool({
    connectionString: process.env.DATABASE_URL,
});
// Prisma Client
const client_1 = __importDefault(require("@prisma/client"));
const { PrismaClient } = client_1.default;
exports.prisma = new PrismaClient();
