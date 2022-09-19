"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.verifyEmailNotExists = exports.verifyEmailExists = void 0;
const errorMiddleware_1 = require("../middlewares/errorMiddleware");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyEmailExists(emailExists) {
    if (emailExists)
        throw (0, errorMiddleware_1.conflictError)("Email");
}
exports.verifyEmailExists = verifyEmailExists;
function verifyEmailNotExists(emailExists) {
    if (!emailExists)
        throw (0, errorMiddleware_1.unauthorizedError)("Email or password");
}
exports.verifyEmailNotExists = verifyEmailNotExists;
function generateToken(user) {
    const token = jsonwebtoken_1.default.sign({ id: user.id }, String(process.env.JWT_SECRET), {
        expiresIn: "24h",
    });
    return token;
}
exports.generateToken = generateToken;
